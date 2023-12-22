export type MimeType =
    | {
        /**
         * Represents a plain text file.
         */
        mimeType: "text/plain";
        /**
         * Represents a plain text file with Extension: .txt
         */
        ext: ".txt";
    }
    | {
        /**
         * Represents an HTML file.
         */
        mimeType: "text/html";
        /**
         * Represents an HTML file with Extension: .html
         */
        ext: ".html";
    }
    | {
        /**
         * Represents an HTML file.
         */
        mimeType: "text/html";
        /**
         * Represents an HTML file with Extension: .htm
         */
        ext: ".htm";
    }
    | {
        /**
         * Represents a CSS file.
         */
        mimeType: "text/css";
        /**
         * Represents a CSS file with Extension: .css
         */
        ext: ".css";
    }
    | {
        /**
         * Represents a JavaScript file.
         */
        mimeType: "application/javascript";
        /**
         * Represents a JavaScript file with Extension: .js
         */
        ext: ".js";
    }
    | {
        /**
         * Represents a JSON file.
         */
        mimeType: "application/json";
        /**
         * Represents a JSON file with Extension: .json
         */
        ext: ".json";
    }
    | {
        /**
         * Represents an XML file.
         */
        mimeType: "application/xml";
        /**
         * Represents an XML file with Extension: .xml
         */
        ext: ".xml";
    }
    | {
        /**
         * Represents a PDF file.
         */
        mimeType: "application/pdf";
        /**
         * Represents a PDF file with Extension: .pdf
         */
        ext: ".pdf";
    }
    | {
        /**
         * Represents a ZIP file.
         */
        mimeType: "application/zip";
        /**
         * Represents a ZIP file with Extension: .zip
         */
        ext: ".zip";
    }
    | {
        /**
         * Represents form data encoded in the URL format.
         */
        mimeType: "application/x-www-form-urlencoded";
        /**
         * Represents form data encoded in the URL format with Extension: .urlencoded
         */
        ext: ".urlencoded";
    }
    | {
        /**
         * Represents a binary file.
         */
        mimeType: "application/octet-stream";
        /**
         * Represents a binary file with Extension: .bin
         */
        ext: ".bin";
    }
    | {
        /**
         * Represents a JPEG image file.
         */
        mimeType: "image/jpeg";
        /**
         * Represents a JPEG image file with Extension: .jpeg
         */
        ext: ".jpeg";
    }
    | {
        /**
         * Represents a JPEG image file.
         */
        mimeType: "image/jpeg";
        /**
         * Represents a JPEG image file with Extension: .jpg
         */
        ext: ".jpg";
    }
    | {
        /**
         * Represents a PNG image file.
         */
        mimeType: "image/png";
        /**
         * Represents a PNG image file with Extension: .png
         */
        ext: ".png";
    }
    | {
        /**
         * Represents a GIF image file.
         */
        mimeType: "image/gif";
        /**
         * Represents a GIF image file with Extension: .gif
         */
        ext: ".gif";
    }
    | {
        /**
         * Represents an MP3 audio file.
         */
        mimeType: "audio/mpeg";
        /**
         * Represents an MP3 audio file with Extension: .mp3
         */
        ext: ".mp3";
    }
    | {
        /**
         * Represents a WAV audio file.
         */
        mimeType: "audio/wav";
        /**
         * Represents a WAV audio file with Extension: .wav
         */
        ext: ".wav";
    }
    | {
        /**
         * Represents an MP4 video file.
         */
        mimeType: "video/mp4";
        /**
         * Represents an MP4 video file with Extension: .mp4
         */
        ext: ".mp4";
    }
    | {
        /**
         * Represents a QuickTime video file.
         */
        mimeType: "video/quicktime";
        /**
         * Represents a QuickTime video file with Extension: .mov
         */
        ext: ".mov";
    }
    | {
        /**
         * Represents an AVI video file.
         */
        mimeType: "video/x-msvideo";
        /**
         * Represents an AVI video file with Extension: .avi
         */
        ext: ".avi";
    }
    | {
        /**
         * Represents a Microsoft Word document.
         */
        mimeType: "application/msword";
        /**
         * Represents a Microsoft Word document with Extension: .doc
         */
        ext: ".doc";
    }
    | {
        /**
         * Represents a Microsoft Word document in the XML-based format.
         */
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        /**
         * Represents a Microsoft Word document in the XML-based format with Extension: .docx
         */
        ext: ".docx";
    }
    | {
        /**
         * Represents a Microsoft Excel spreadsheet.
         */
        mimeType: "application/vnd.ms-excel";
        /**
         * Represents a Microsoft Excel spreadsheet with Extension: .xls
         */
        ext: ".xls";
    }
    | {
        /**
         * Represents a Microsoft Excel spreadsheet in the XML-based format.
         */
        mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        /**
         * Represents a Microsoft Excel spreadsheet in the XML-based format with Extension: .xlsx
         */
        ext: ".xlsx";
    }
    | {
        /**
         * Represents a Microsoft PowerPoint presentation.
         */
        mimeType: "application/vnd.ms-powerpoint";
        /**
         * Represents a Microsoft PowerPoint presentation with Extension: .ppt
         */
        ext: ".ppt";
    }
    | {
        /**
         * Represents a Microsoft PowerPoint presentation in the XML-based format.
         */
        mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        /**
         * Represents a Microsoft PowerPoint presentation in the XML-based format with Extension: .pptx
         */
        ext: ".pptx";
    }
    | {
        /**
         * Represents a RAR archive file.
         */
        mimeType: "application/x-rar-compressed";
        /**
         * Represents a RAR archive file with Extension: .rar
         */
        ext: ".rar";
    }
    | {
        /**
         * Represents a TAR archive file.
         */
        mimeType: "application/x-tar";
        /**
         * Represents a TAR archive file with Extension: .tar
         */
        ext: ".tar";
    }
    | {
        /**
         * Represents a GZIP archive file.
         */
        mimeType: "application/gzip";
        /**
         * Represents a GZIP archive file with Extension: .gz
         */
        ext: ".gz";
    }
    | {
        /**
         * Represents a BZIP2 archive file.
         */
        mimeType: "application/x-bzip2";
        /**
         * Represents a BZIP2 archive file with Extension: .bz2
         */
        ext: ".bz2";
    }
    | {
        /**
         * Represents a 7-Zip archive file.
         */
        mimeType: "application/x-7z-compressed";
        /**
         * Represents a 7-Zip archive file with Extension: .7z
         */
        ext: ".7z";
    }
    | {
        /**
         * Represents an Android application package file.
         */
        mimeType: "application/vnd.android.package-archive";
        /**
         * Represents an Android application package file with Extension: .apk
         */
        ext: ".apk";
    };

export const MimeData: MimeType[] = [
    { mimeType: "text/plain", ext: ".txt" },
    { mimeType: "text/html", ext: ".html" },
    { mimeType: "text/html", ext: ".htm" },
    { mimeType: "text/css", ext: ".css" },
    { mimeType: "application/javascript", ext: ".js" },
    { mimeType: "application/json", ext: ".json" },
    { mimeType: "application/xml", ext: ".xml" },
    { mimeType: "application/pdf", ext: ".pdf" },
    { mimeType: "application/zip", ext: ".zip" },
    { mimeType: "application/x-www-form-urlencoded", ext: ".urlencoded" },
    { mimeType: "application/octet-stream", ext: ".bin" },
    { mimeType: "image/jpeg", ext: ".jpeg" },
    { mimeType: "image/jpeg", ext: ".jpg" },
    { mimeType: "image/png", ext: ".png" },
    { mimeType: "image/gif", ext: ".gif" },
    { mimeType: "audio/mpeg", ext: ".mp3" },
    { mimeType: "audio/wav", ext: ".wav" },
    { mimeType: "video/mp4", ext: ".mp4" },
    { mimeType: "video/quicktime", ext: ".mov" },
    { mimeType: "video/x-msvideo", ext: ".avi" },
    { mimeType: "application/msword", ext: ".doc" },
    { mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ext: ".docx" },
    { mimeType: "application/vnd.ms-excel", ext: ".xls" },
    { mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ext: ".xlsx" },
    { mimeType: "application/vnd.ms-powerpoint", ext: ".ppt" },
    { mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation", ext: ".pptx" },
    { mimeType: "application/x-rar-compressed", ext: ".rar" },
    { mimeType: "application/x-tar", ext: ".tar" },
    { mimeType: "application/gzip", ext: ".gz" },
    { mimeType: "application/x-bzip2", ext: ".bz2" },
    { mimeType: "application/x-7z-compressed", ext: ".7z" },
    { mimeType: "application/vnd.android.package-archive", ext: ".apk" }
]