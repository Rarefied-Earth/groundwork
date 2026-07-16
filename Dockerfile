FROM node:22-alpine

RUN npm install --global mcp-remote@0.1.38 \
    && npm cache clean --force

USER node
ENV MCP_REMOTE_CONFIG_DIR=/tmp/mcp-remote

ENTRYPOINT ["mcp-remote", "https://connector.rarefied.earth/public/mcp", "--transport", "http-only"]
