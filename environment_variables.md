# Environment Variables

## Backend (.env)
```
MONGO_URL=<mongodb-connection-string>
DB_NAME=test_database
CORS_ORIGINS=*
```

## Frontend (.env)
```
REACT_APP_BACKEND_URL=<production-url>
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

## Google OAuth (Emergent-managed)
- Uses Emergent Auth: https://auth.emergentagent.com/
- Redirect URL pattern: {origin}/dashboard or {origin}/register
- No separate Google OAuth credentials needed (managed by platform)
