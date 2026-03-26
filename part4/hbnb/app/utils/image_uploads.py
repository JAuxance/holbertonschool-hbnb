import os
import uuid

from werkzeug.utils import secure_filename


def normalize_image_extension(filename):
    extension = str(filename or "").rsplit(".", 1)[-1].lower()
    if extension == "jpeg":
        return "jpg"
    return extension


def get_uploaded_file_size(image_file):
    try:
        stream = image_file.stream
        current_position = stream.tell()
        stream.seek(0, os.SEEK_END)
        size = stream.tell()
        stream.seek(current_position)
        return size
    except (AttributeError, OSError):
        return 0


def detect_image_format(image_file):
    try:
        stream = image_file.stream
        current_position = stream.tell()
        stream.seek(0)
        header = stream.read(16)
        stream.seek(current_position)
    except (AttributeError, OSError):
        return None

    if header.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if header.startswith(b"\xff\xd8\xff"):
        return "jpg"
    if header.startswith(b"RIFF") and len(header) >= 12 and header[8:12] == b"WEBP":
        return "webp"
    return None


def validate_uploaded_image_file(
    image_file,
    *,
    allowed_extensions,
    max_size,
    invalid_extension_message,
    invalid_content_message,
    max_size_message,
):
    filename = secure_filename(getattr(image_file, "filename", ""))
    if not filename:
        raise ValueError(invalid_extension_message)

    extension = normalize_image_extension(filename)
    if extension not in allowed_extensions:
        raise ValueError(invalid_extension_message)

    if get_uploaded_file_size(image_file) > max_size:
        raise ValueError(max_size_message)

    detected_format = detect_image_format(image_file)
    if not detected_format or detected_format not in allowed_extensions:
        raise ValueError(invalid_content_message)

    if detected_format != extension:
        raise ValueError(invalid_content_message)

    return extension


def save_uploaded_image_file(image_file, *, upload_dir, url_prefix, extension):
    os.makedirs(upload_dir, exist_ok=True)
    stored_filename = f"{uuid.uuid4().hex}.{extension}"
    image_file.save(os.path.join(upload_dir, stored_filename))
    return f"{url_prefix}/{stored_filename}"


def delete_uploaded_internal_file(image_url, *, url_prefix, upload_dir):
    if not image_url or not str(image_url).startswith(url_prefix):
        return

    filename = os.path.basename(image_url)
    if not filename:
        return

    file_path = os.path.join(upload_dir, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
