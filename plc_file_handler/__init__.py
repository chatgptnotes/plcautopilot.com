"""
PLC File Handler
Multi-platform PLC file format parser, editor, and generator.

Supports:
- Schneider Electric (.smbp)
- Siemens TIA Portal (.ap*, .zap*)
- Rockwell/Allen-Bradley (.ACD, .L5X, .L5K)
- Mitsubishi (.gxw, .gx2, .gx3)
- CODESYS (.project)
"""

__version__ = "1.0.0"
__author__ = "PLCAutoPilot Team"

from .utils.format_detector import detect_plc_format
from .parsers.schneider_parser import SchneiderParser
from .parsers.rockwell_parser import RockwellParser
from .parsers.siemens_parser import SiemensParser
from .parsers.mitsubishi_parser import MitsubishiParser
from .generators.schneider_generator import SchneiderGenerator
from .generators.rockwell_generator import RockwellGenerator
from .converters.sketch_analyzer import SketchAnalyzer
from .converters.platform_converter import PlatformConverter

__all__ = [
    'detect_plc_format',
    'SchneiderParser',
    'RockwellParser',
    'SiemensParser',
    'MitsubishiParser',
    'SchneiderGenerator',
    'RockwellGenerator',
    'SketchAnalyzer',
    'PlatformConverter',
]
