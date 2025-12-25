"""
Sketch to Ladder Logic Analyzer
Uses Anthropic Claude AI vision to analyze hand-drawn ladder logic sketches.
"""

import os
import json
from pathlib import Path
from typing import Dict, List, Optional
import base64

try:
    import anthropic
    CLAUDE_AVAILABLE = True
except ImportError:
    CLAUDE_AVAILABLE = False
    print("Warning: anthropic not installed. Run: pip install anthropic")

try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("Warning: PIL not installed. Run: pip install pillow")


class SketchAnalyzer:
    """
    Analyzes hand-drawn ladder logic sketches using AI vision.
    Converts sketches to structured ladder logic data.
    """

    def __init__(self, api_key: Optional[str] = None, model: str = "claude-3-5-sonnet-20241022"):
        """
        Initialize sketch analyzer.

        Args:
            api_key: Anthropic Claude API key (if not provided, reads from env)
            model: Claude model to use
        """
        self.api_key = api_key or os.getenv('ANTHROPIC_API_KEY')
        self.model_name = model

        if not self.api_key:
            raise ValueError("ANTHROPIC_API_KEY not found in environment or parameters")

        if not CLAUDE_AVAILABLE:
            raise ImportError("anthropic package required. Install: pip install anthropic")

        if not PIL_AVAILABLE:
            raise ImportError("PIL package required. Install: pip install pillow")

        # Initialize Claude client
        self.client = anthropic.Anthropic(api_key=self.api_key)

    def analyze_sketch(self, image_path: str, platform: str = "schneider") -> Dict:
        """
        Analyze a hand-drawn ladder logic sketch.

        Args:
            image_path: Path to sketch image
            platform: Target PLC platform (schneider, rockwell, siemens, etc.)

        Returns:
            Structured ladder logic data
        """
        img_path = Path(image_path)

        if not img_path.exists():
            raise FileNotFoundError(f"Image not found: {image_path}")

        # Load image and convert to base64
        with open(img_path, 'rb') as f:
            image_data = base64.standard_b64encode(f.read()).decode('utf-8')

        # Determine media type
        ext = img_path.suffix.lower()
        media_types = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
        }
        media_type = media_types.get(ext, 'image/jpeg')

        # Create platform-specific prompt
        prompt = self._create_analysis_prompt(platform)

        # Send to Claude
        print("Analyzing sketch with Claude AI...")
        response = self.client.messages.create(
            model=self.model_name,
            max_tokens=4096,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": image_data,
                            },
                        },
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ],
                }
            ],
        )

        # Parse response
        analysis = self._parse_claude_response(response.content[0].text)

        # Add metadata
        analysis['source_image'] = str(img_path)
        analysis['target_platform'] = platform
        analysis['confidence'] = self._calculate_confidence(analysis)

        return analysis

    def _create_analysis_prompt(self, platform: str) -> str:
        """Create detailed analysis prompt for Claude."""

        base_prompt = """
Analyze this hand-drawn ladder logic diagram and extract ALL details with precision.

LADDER LOGIC SYMBOLS TO IDENTIFY:
1. Contacts (Inputs):
   - Normally Open (NO): —| |— or —| |  (closed when energized)
   - Normally Closed (NC): —|/|— or —|X|  (open when energized)

2. Coils (Outputs):
   - Standard Coil: —( )— (energizes when logic true)
   - Negated Coil: —(/)— (de-energizes when logic true)
   - Set Coil: —(S)— (latches on)
   - Reset Coil: —(R)— (latches off)

3. Timers:
   - TON: On-Delay Timer —[TON]— (delays turning on)
   - TOF: Off-Delay Timer —[TOF]— (delays turning off)
   - TP: Pulse Timer —[TP]— (generates pulse)
   - RTO: Retentive Timer —[RTO]— (retains value)

4. Counters:
   - CTU: Count Up —[CTU]— (increments)
   - CTD: Count Down —[CTD]— (decrements)
   - CTUD: Count Up/Down —[CTUD]— (bidirectional)

5. Comparison & Math:
   - EQU: Equal —[EQU]— (A == B)
   - NEQ: Not Equal —[NEQ]— (A != B)
   - GRT: Greater Than —[GRT]— (A > B)
   - LES: Less Than —[LES]— (A < B)
   - ADD: Addition —[ADD]— (A + B)
   - SUB: Subtraction —[SUB]— (A - B)
   - MUL: Multiply —[MUL]— (A * B)
   - DIV: Divide —[DIV]— (A / B)

6. Function Blocks:
   - PID: PID Controller —[PID]—
   - MOVE: Data Move —[MOV]—
   - AND/OR/XOR: Logic gates

7. Special Elements:
   - Rising Edge: —[P]— or --|↑|--
   - Falling Edge: —[N]— or --|↓|--
   - One-Shot: —[OSR]—

EXTRACTION REQUIREMENTS:
1. NUMBER all rungs sequentially (0, 1, 2, ...)
2. IDENTIFY all symbols on each rung left-to-right
3. EXTRACT labels/addresses (e.g., "START", "M0.0", "%I0.1")
4. CAPTURE preset values for timers/counters
5. NOTE connections between parallel branches
6. READ any handwritten comments or annotations
7. DETECT logic flow and dependencies

OUTPUT FORMAT (JSON):
"""

        json_template = """
{
  "analysis_metadata": {
    "total_rungs": 0,
    "total_contacts": 0,
    "total_coils": 0,
    "total_timers": 0,
    "total_counters": 0,
    "sketch_quality": "good|fair|poor",
    "ambiguities": []
  },
  "rungs": [
    {
      "rung_number": 0,
      "comment": "Description of what this rung does",
      "elements": [
        {
          "type": "contact_no|contact_nc|coil|coil_set|coil_reset|timer_ton|timer_tof|counter_ctu|etc",
          "label": "START_BTN|MOTOR|TIMER1|etc",
          "address": "%I0.0|%Q0.0|%TM0|M0.0|etc",
          "position": "left|middle|right",
          "branch": 0,
          "parameters": {
            "preset": "5000",
            "time_base": "ms|s",
            "data_type": "INT|DINT|REAL"
          }
        }
      ],
      "logic_description": "Clear English description of rung logic"
    }
  ],
  "tags_detected": [
    {
      "name": "START_BTN",
      "address": "%I0.0",
      "type": "INPUT|OUTPUT|MEMORY|TIMER|COUNTER",
      "data_type": "BOOL|INT|REAL",
      "comment": "Start push button"
    }
  ],
  "platform_notes": {
    "addressing_scheme": "IEC|Allen-Bradley|Schneider|Siemens",
    "special_instructions": []
  }
}
"""

        platform_notes = {
            "schneider": """
TARGET PLATFORM: Schneider Electric M221/M241
- Use IEC addressing: %I (inputs), %Q (outputs), %M (memory), %TM (timers)
- Timer format: TON (T#5s for 5 seconds)
- Counter preset values in decimal
""",
            "rockwell": """
TARGET PLATFORM: Rockwell/Allen-Bradley CompactLogix
- Use tag-based addressing (no fixed I/O addresses)
- Timer format: TON with .PRE, .ACC, .DN members
- Tags like Local:1:I.Data[0], Local:2:O.Data[0]
""",
            "siemens": """
TARGET PLATFORM: Siemens S7-1200/S7-1500
- Use symbolic addressing: I0.0 (inputs), Q0.0 (outputs), M0.0 (memory)
- Timer format: TON (TIME#5s for 5 seconds)
- DB blocks for data storage
""",
            "mitsubishi": """
TARGET PLATFORM: Mitsubishi FX/iQ-R Series
- Use device addressing: X (inputs), Y (outputs), M (memory), T (timers), C (counters)
- Timer format: T0 K50 (50 * time base)
- Counter format: C0 K100 (preset 100)
"""
        }

        full_prompt = base_prompt + json_template + platform_notes.get(platform, "")

        full_prompt += """

CRITICAL INSTRUCTIONS:
1. Be PRECISE - if you cannot clearly identify a symbol, mark it as "unclear" in ambiguities
2. Preserve ALL labels exactly as written (even if handwriting is messy)
3. Detect parallel branches (OR logic) vs series elements (AND logic)
4. Number rungs from top to bottom (0, 1, 2, ...)
5. Extract timer/counter preset values
6. Note any special conditions or edge triggers
7. Return ONLY valid JSON, no extra text

If the sketch quality is poor, still provide best-effort analysis and list all ambiguities.
"""

        return full_prompt

    def _parse_claude_response(self, response_text: str) -> Dict:
        """Parse Claude's JSON response."""

        # Remove markdown code blocks if present
        cleaned = response_text.strip()
        if cleaned.startswith('```json'):
            cleaned = cleaned[7:]
        if cleaned.startswith('```'):
            cleaned = cleaned[3:]
        if cleaned.endswith('```'):
            cleaned = cleaned[:-3]

        cleaned = cleaned.strip()

        try:
            analysis = json.loads(cleaned)
            return analysis
        except json.JSONDecodeError as e:
            print(f"JSON parse error: {e}")
            print(f"Response text: {response_text[:500]}")

            # Return error structure
            return {
                "error": "Failed to parse Claude response",
                "raw_response": response_text,
                "parse_error": str(e)
            }

    def _calculate_confidence(self, analysis: Dict) -> float:
        """Calculate confidence score for analysis."""

        if "error" in analysis:
            return 0.0

        metadata = analysis.get('analysis_metadata', {})
        quality = metadata.get('sketch_quality', 'poor')
        ambiguities = len(metadata.get('ambiguities', []))

        # Base score from quality
        quality_scores = {'good': 0.9, 'fair': 0.6, 'poor': 0.3}
        base_score = quality_scores.get(quality, 0.3)

        # Reduce for ambiguities
        confidence = base_score - (ambiguities * 0.05)

        return max(0.0, min(1.0, confidence))

    def export_analysis(self, analysis: Dict, output_path: str):
        """
        Export analysis to JSON file.

        Args:
            analysis: Analysis result from analyze_sketch()
            output_path: Path to output JSON file
        """
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(analysis, f, indent=2)

        print(f"Analysis exported to: {output_path}")

    def get_summary(self, analysis: Dict) -> str:
        """Get human-readable summary of analysis."""

        if "error" in analysis:
            return f"Analysis Error: {analysis['error']}"

        metadata = analysis.get('analysis_metadata', {})
        rungs = analysis.get('rungs', [])
        tags = analysis.get('tags_detected', [])

        summary = f"""
Sketch Analysis Summary
========================
Source: {analysis.get('source_image', 'Unknown')}
Target Platform: {analysis.get('target_platform', 'Generic')}
Confidence: {analysis.get('confidence', 0.0):.1%}
Quality: {metadata.get('sketch_quality', 'Unknown')}

Statistics:
- Total Rungs: {metadata.get('total_rungs', len(rungs))}
- Contacts: {metadata.get('total_contacts', 0)}
- Coils: {metadata.get('total_coils', 0)}
- Timers: {metadata.get('total_timers', 0)}
- Counters: {metadata.get('total_counters', 0)}

Tags Detected: {len(tags)}
"""

        if metadata.get('ambiguities'):
            summary += "\nAmbiguities Found:\n"
            for amb in metadata['ambiguities']:
                summary += f"  - {amb}\n"

        summary += "\nRung Summary:\n"
        for rung in rungs[:5]:  # Show first 5 rungs
            summary += f"  Rung {rung.get('rung_number', '?')}: {rung.get('logic_description', 'No description')}\n"

        if len(rungs) > 5:
            summary += f"  ... and {len(rungs) - 5} more rungs\n"

        return summary

    def validate_analysis(self, analysis: Dict) -> List[str]:
        """
        Validate analysis for completeness and correctness.

        Args:
            analysis: Analysis result

        Returns:
            List of validation errors (empty if valid)
        """
        errors = []

        if "error" in analysis:
            errors.append(f"Analysis failed: {analysis['error']}")
            return errors

        # Check required fields
        if 'rungs' not in analysis:
            errors.append("Missing 'rungs' field")

        if 'tags_detected' not in analysis:
            errors.append("Missing 'tags_detected' field")

        # Validate rungs
        rungs = analysis.get('rungs', [])
        for i, rung in enumerate(rungs):
            if 'rung_number' not in rung:
                errors.append(f"Rung {i}: Missing rung_number")

            if 'elements' not in rung or not rung['elements']:
                errors.append(f"Rung {rung.get('rung_number', i)}: No elements found")

            # Check element types
            for elem in rung.get('elements', []):
                if 'type' not in elem:
                    errors.append(f"Rung {rung.get('rung_number', i)}: Element missing type")

        return errors


# Example usage
if __name__ == "__main__":
    # Test if environment is configured
    if os.getenv('ANTHROPIC_API_KEY'):
        print("Claude API key found. SketchAnalyzer ready.")

        # Example usage (requires actual image file)
        # analyzer = SketchAnalyzer()
        # analysis = analyzer.analyze_sketch("motor_control_sketch.jpg", platform="schneider")
        # print(analyzer.get_summary(analysis))
        # analyzer.export_analysis(analysis, "analysis_result.json")
    else:
        print("Set ANTHROPIC_API_KEY environment variable to use SketchAnalyzer")
        print("Example: export ANTHROPIC_API_KEY=your_key_here")
