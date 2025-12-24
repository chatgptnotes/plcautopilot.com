"""
PLC File Format Detector
Identifies PLC file formats by extension and magic number.
"""

from pathlib import Path
from typing import Dict, Optional


class PLCFormatInfo:
    """Information about a detected PLC file format."""

    def __init__(self, platform: str, format_type: str, version: Optional[str] = None):
        self.platform = platform
        self.format_type = format_type
        self.version = version

    def __repr__(self):
        return f"PLCFormatInfo(platform={self.platform}, format={self.format_type}, version={self.version})"


def detect_plc_format(file_path: str) -> PLCFormatInfo:
    """
    Detect PLC file format by extension and magic number.

    Args:
        file_path: Path to the PLC file

    Returns:
        PLCFormatInfo object with platform and format details

    Raises:
        FileNotFoundError: If file doesn't exist
        ValueError: If format is unknown
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    ext = path.suffix.lower()

    # Read first 16 bytes for magic number detection
    with open(file_path, 'rb') as f:
        magic = f.read(16)

    # ZIP-based formats (50 4B in hex = "PK")
    if magic[:2] == b'PK':
        return _detect_zip_based_format(ext, magic)

    # OLE2 Compound File (D0 CF 11 E0 A1 B1 1A E1)
    elif magic[:8] == b'\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1':
        return _detect_ole2_format(ext)

    # XML-based formats
    elif magic[:5] == b'<?xml':
        return _detect_xml_format(ext, file_path)

    # Siemens binary project folder
    elif ext.startswith('.ap'):
        version = ext[3:]  # Extract version number from .ap15, .ap16, etc.
        return PLCFormatInfo('siemens', 'tia_portal_project', version)

    # Text-based formats
    elif ext in ['.l5k', '.st', '.scl']:
        return _detect_text_format(ext)

    else:
        raise ValueError(f"Unknown PLC file format: {ext}")


def _detect_zip_based_format(ext: str, magic: bytes) -> PLCFormatInfo:
    """Detect ZIP-based PLC formats."""

    if ext == '.smbp':
        return PLCFormatInfo('schneider', 'machine_expert_basic', None)

    elif ext.startswith('.zap'):
        # Extract version from .zap15, .zap16, etc.
        version = ext[4:] if len(ext) > 4 else None
        return PLCFormatInfo('siemens', 'tia_portal_archive', version)

    elif ext == '.acd':
        return PLCFormatInfo('rockwell', 'studio5000_binary', None)

    elif ext == '.zip':
        # Could be exported project, need deeper inspection
        return PLCFormatInfo('unknown', 'zip_archive', None)

    else:
        raise ValueError(f"Unknown ZIP-based PLC format: {ext}")


def _detect_ole2_format(ext: str) -> PLCFormatInfo:
    """Detect OLE2 Compound File PLC formats."""

    if ext in ['.gxw', '.gx2', '.gx3']:
        version = '2' if ext == '.gxw' else ext[3]
        return PLCFormatInfo('mitsubishi', 'gx_works', version)

    else:
        raise ValueError(f"Unknown OLE2 PLC format: {ext}")


def _detect_xml_format(ext: str, file_path: str) -> PLCFormatInfo:
    """Detect XML-based PLC formats by reading root element."""

    # Quick parse to get root element
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read(1000)  # Read first 1KB

    if ext == '.l5x':
        return PLCFormatInfo('rockwell', 'studio5000_xml', None)

    elif ext == '.project':
        if 'codesys' in content.lower():
            return PLCFormatInfo('codesys', 'project_xml', None)
        else:
            return PLCFormatInfo('unknown', 'generic_xml', None)

    elif ext in ['.xml', '.xti']:
        # Generic XML, try to identify by content
        if 'schneider' in content.lower() or 'somachine' in content.lower():
            return PLCFormatInfo('schneider', 'xml_export', None)
        elif 'siemens' in content.lower() or 'tia' in content.lower():
            return PLCFormatInfo('siemens', 'xml_export', None)
        elif 'rockwell' in content.lower():
            return PLCFormatInfo('rockwell', 'xml_export', None)
        else:
            return PLCFormatInfo('unknown', 'generic_xml', None)

    else:
        raise ValueError(f"Unknown XML-based PLC format: {ext}")


def _detect_text_format(ext: str) -> PLCFormatInfo:
    """Detect text-based PLC formats."""

    if ext == '.l5k':
        return PLCFormatInfo('rockwell', 'studio5000_ascii', None)

    elif ext == '.st':
        return PLCFormatInfo('generic', 'structured_text', None)

    elif ext == '.scl':
        return PLCFormatInfo('siemens', 'structured_control_language', None)

    elif ext == '.ld':
        return PLCFormatInfo('generic', 'ladder_diagram_text', None)

    else:
        raise ValueError(f"Unknown text-based PLC format: {ext}")


def get_supported_formats() -> Dict[str, list]:
    """
    Get dictionary of supported PLC formats by platform.

    Returns:
        Dictionary mapping platform names to list of supported extensions
    """
    return {
        'schneider': ['.smbp', '.xml'],
        'siemens': ['.ap15', '.ap16', '.ap17', '.ap18', '.ap19', '.zap15', '.zap16', '.zap17', '.scl'],
        'rockwell': ['.acd', '.l5x', '.l5k'],
        'mitsubishi': ['.gxw', '.gx2', '.gx3'],
        'codesys': ['.project', '.export'],
        'generic': ['.st', '.ld', '.xml']
    }


def is_supported_format(file_path: str) -> bool:
    """
    Check if file format is supported.

    Args:
        file_path: Path to the file

    Returns:
        True if format is supported, False otherwise
    """
    try:
        detect_plc_format(file_path)
        return True
    except (ValueError, FileNotFoundError):
        return False
