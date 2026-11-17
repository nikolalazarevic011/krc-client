# Kingdom Running Club (KRC) Dashboard Client

A React-based member dashboard client for the Kingdom Running Club, providing members with access to classes, homework, exercises, handouts, resources, and wellness certificates.

---

## 📖 Key Documentation

To maintain clean and DRY (Don't Repeat Yourself) documentation, core concepts and internal architecture are maintained in dedicated documents:
*   **Domain Vocabulary & Glossary**: Refer to [CONTEXT.md](CONTEXT.md) for canonical terms (e.g., *Class*, *Exercise*, *Homework*, *Handout*, *Certificate*, *Member*).
*   **Architectural Decision Records & Patterns**: Refer to [.agent/agent.md](.agent/agent.md) for details on framework configurations (React Router v6 loaders/actions, Redux Toolkit slices, Material-UI theme setup, and directory structure).

---

## 🛠️ Setup & Local Development

### 1. Prerequisites
*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   npm

### 2. Environment Configuration
The application relies on environment variables for local development and build targets.
1.  Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  Open `.env` and fill in the private configuration values for your environment (API endpoint URL, path configuration, etc.).

> [!NOTE]
> Local development is configured to run over secure HTTPS to ensure compatibility with WordPress secure REST APIs without encountering mixed-content blocks. The local development server expects certificate files (`cert.pem` and `key.pem`) to be present in the repository root directory.

### 3. Installation
Install the project dependencies:
```bash
npm install
```

### 4. Running the Development Server
Start the local webpack development server with HTTPS:
```bash
npm start
```
Your local server will spin up and be accessible via secure connection.

---

## 🚀 Build & Deployment

Deployment to the staging/production environments is performed manually via cPanel.

### 1. Build the Production Bundle
Compile and optimize the assets for production:
```bash
npm run build
```
This will generate a `build/` directory containing the optimized static production build.

### 2. Manual cPanel Deployment
1.  Access your cPanel file manager or connect via FTP/SFTP.
2.  Navigate to the public web root path:
    ```
    public_html/krc/running_dashboard/members/build
    ```
3.  Upload and completely replace the contents of that remote directory with the newly compiled contents from your local `build/` directory.
