from fastapi import FastAPI
from api.v1.api import api
from core.settings import settings


app = FastAPI(title=settings.app_title, description=settings.app_description)


app.include_router(api)

import uvicorn
if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)