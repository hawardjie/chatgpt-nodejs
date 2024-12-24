# Goal: Create a ChatGPT application integrated with OpenAI

1. Clone the repository
2. Create a .env file with your OpenAI API key
3. Run the application
4. Start asking questions

## Step 1: Clone the repository

Clone the repository **chatgpt-nodejs** from GitHub:

```bash
$ git clone https://github.com/hawardjie/chatgpt-nodejs.git
```

## Step 2: Create .env file with your OpenAI API KEY

Go to the project directory

```bash
$ cd chatgpt-nodejs
```

Use your text editor, i.e. vim, to create a new file named .env.

```bash
$ vim .env
```

Add the following line that contains your OpenAI key. Replace <YOUR_API_KEY> with your actual OpenAI API key obtained from openai.com. You need to sign up for an OpenAI account and access the API key page to create a new secret to generate <YOUR_API_KEY>.

```bash
OPENAI_API_KEY=<YOUR_API_KEY>
```

## Step 3: Run the application

```bash
$ docker-compose up
```

## Step 4: Start asking questions

Open your browser and go to http://localhost:8080

Enter your question there
