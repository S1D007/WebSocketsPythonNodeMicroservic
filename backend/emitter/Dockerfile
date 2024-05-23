FROM python:3.10-slim AS base

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.10-slim AS runtime

WORKDIR /usr/src/app

COPY --from=base /usr/local/lib/python3.10/site-packages/ /usr/local/lib/python3.10/site-packages/

COPY . .

EXPOSE 8765

CMD ["python", "ws.py"]
