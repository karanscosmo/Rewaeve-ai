# Vercel Deployment Guide for ReWeave AI

We've configured your project to use **Vercel Services** (experimental), which allows deploying both the Next.js frontend and FastAPI backend from a single repository.

## 1. Files Added/Modified
- `vercel.json`: Root configuration file that routes `/*` to the frontend and `/_/backend` to the backend.
- `backend/main.py`: A bridge file to help Vercel find your FastAPI `app` instance.

## 2. Environment Variables
You must set the following variables in the **Vercel Dashboard** (Settings > Environment Variables):

### Backend Variables
| Key | Recommended Value | Note |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgres://...` | Use Vercel Postgres or an external PostgreSQL. |
| `SECRET_KEY` | `your-secure-random-string` | Used for JWT authentication. |
| `REDIS_URL` | `redis://...` | Required for Celery. Use **Upstash Redis** for a serverless-friendly option. |
| `OPENAI_API_KEY` | `sk-...` | Your OpenAI API key. |
| `AI_PROVIDER` | `openai` | |

### Frontend Variables
| Key | Recommended Value | Note |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `/_/backend` | Routes API calls through the Vercel proxy. |

## 3. Important Notes
- **Persistence**: Vercel functions are ephemeral. Any files uploaded will not persist on the server. The current implementation saves metadata to the DB, which is fine, but if you need to store files, consider using **Vercel Blob** or **AWS S3**.
- **Database**: Since you are using `psycopg2-binary`, ensure your `DATABASE_URL` points to a PostgreSQL instance.
- **WebSockets**: Vercel Functions (Serverless) **do not support standard WebSockets** (`ws://`). Your notification system using WebSockets may need to be migrated to a service like **Pusher** or **Ably**, or use Vercel's Edge Config/Middleware for real-time updates if applicable.

## 4. Deployment Steps
1. Push your changes to GitHub/GitLab/Bitbucket.
2. In Vercel, import the repository.
3. Vercel should detect the `vercel.json` and configure the services automatically.
4. Add the environment variables listed above.
5. Deploy!
