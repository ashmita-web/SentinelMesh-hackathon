from fastapi import APIRouter, WebSocket

router = APIRouter()

@router.websocket("/live")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    counter = 0
    while True:
        counter += 1
        await websocket.send_json({
            "message": "Live connection active",
            "count": counter
        })
        import asyncio
        await asyncio.sleep(2)
