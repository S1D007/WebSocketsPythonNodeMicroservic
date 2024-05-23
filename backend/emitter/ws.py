import asyncio
import websockets
import logging

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

connected_clients = set()

async def handle_client(websocket, path):
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            for client in connected_clients:
                await client.send(message)
    finally:
        connected_clients.remove(websocket)

async def main():
    logger.info("Starting WebSocket server on ws://localhost:8765")
    async with websockets.serve(handle_client, "0.0.0.0", 8765):
        logger.info("WebSocket server started and awaiting connections")
        await asyncio.Future()


if __name__ == "__main__":
    logger.info("Initializing WebSocket server")
    asyncio.run(main())
