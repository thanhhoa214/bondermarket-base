# Front-end

## Deployed URL: `https://create.bonder.market/`

## Dependencies

- UI library: shadcn-ui
- Web3: Wagmi, rainbowkit
- HTTP cache: TanStackQuery
- Date: date-fns
- Other: usehooks-ts

## Getting Started

1. **Set up your environment variables**: Create a `.env` file under `/frontend` and add your environment variables.

2. **Install dependencies**: Run the following command to install the necessary packages:

   ```bash
   npm install
   ```

3. **Run the development server**: Start the server with:

   ```bash
   npm run dev
   ```

## Advance

- Generate smart contract TypeScript assets (interfaces, constants, ...). Make any changes needed in `frontend/wagmi.config.ts`

  ```bash
  npm run generate-contract-ts
  ```

## Notes

Always mind about code execution context (server/client). Especially, prior preparing data in server components and pass it as props for client components as default.

- Use `session.address` to query data for current logged user (see [PortfolioPage](frontend/app/portfolio/page.tsx))
