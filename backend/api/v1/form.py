from fastapi import APIRouter, UploadFile, File
from ai_models import transcribe_audio

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Valid extension
    filename = file.filename
    extension = filename.split(".")[-1].lower()
    if extension not in ["mp3", "wav", "txt"]:
        return {"error": "File type not supported"}

    if extension == ["mp3"]:
        pass

    # Read file content
    content = await file.read()

    # Save in Mongodb
    document = {
        "filename": filename,
        "content_type": file.content_type,
        "extension": extension,
        "data": content
    }
    result = await collection.insert_one(document)

    return {
        "message": "Archive up properly",
        "id": str(result.inserted_id),
        "filename": filename
    }

@router.get("/files")
async def list_files():
    files = []
    cursor = collection.find()
    async for document in cursor:
        files.append({
            "id": str(document["_id"]),
            "filename": document["filename"],
            "content_type": document["content_type"],
            "extension": document["extension"]
        })
    return files