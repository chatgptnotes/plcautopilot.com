"""
Mitsubishi GX Works Parser (Placeholder)
Note: Mitsubishi uses OLE2 compound file format.
This is a basic structure for future implementation.
"""

from pathlib import Path
from typing import Dict


class MitsubishiParser:
    """Parser for Mitsubishi GX Works files (.gxw, .gx2, .gx3)."""

    def __init__(self, file_path: str):
        self.file_path = Path(file_path)
        self.project_data = {}

    def parse(self) -> Dict:
        """
        Parse Mitsubishi project file.

        Note: Requires olefile library to parse OLE2 compound format.
        Full implementation pending.
        """
        raise NotImplementedError(
            "Mitsubishi parser not yet implemented. "
            "Requires OLE2 compound file parsing. "
            "Install: pip install olefile"
        )

    def get_summary(self) -> str:
        return "Mitsubishi parser: Not implemented. Requires olefile library."
