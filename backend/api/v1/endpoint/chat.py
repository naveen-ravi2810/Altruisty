from fastapi import APIRouter, Depends, WebSocket
from Schema.chat_schema import Chat
from ai.chat import bot_response
from core.security import validate_authenticated_user_token
import time

router = APIRouter()


@router.post('/chat')
def lets_chat(chat:Chat, token:int = Depends(validate_authenticated_user_token)):
    response = bot_response(chat.chat_query)
    # time.sleep(2)
    return {'resp':response}



from starlette.websockets import WebSocketDisconnect

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        await websocket.accept()
        while True:
            data = await websocket.receive_text()
            response = bot_response(data)
            await websocket.send_text(response)
    except WebSocketDisconnect as e:
        # Handle WebSocket disconnect gracefully
        print(f"WebSocket connection closed with code {e.code}: {e.reason}")
        # Perform any cleanup or logging if needed
    except Exception as e:
        # Handle other exceptions gracefully
        print(f"An error occurred: {str(e)}")
        # Perform appropriate error handling or logging
    finally:
        # Clean up resources if necessary
        pass