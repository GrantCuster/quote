import { useEffect, useState } from "react";

function Index() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const admin_secret = localStorage.getItem("admin_secret");
    if (admin_secret) {
      setLoggedIn(true);
    }
  }, []);

  return loggedIn ? <QuoteMaker /> : <Login />;
}

export default Index;

function Login() {
  const [password, setPassword] = useState("");

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const response = await fetch("/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ admin_secret: password }),
            });
            const data = await response.json();
            if (data.success) {
              localStorage.setItem("admin_secret", password);
            } else {
              alert("Incorrect password");
            }
          }
        }}
      />
    </div>
  );
}

function QuoteMaker() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit() {
    if (!quote || !author || !source) {
      return;
    }
    setSuccess(false);
    setSending(true);
    const body = {
      quote,
      author,
      source,
    };
    setQuote("");
    setAuthor("");
    setSource("");
    const admin_secret = localStorage.getItem("admin_secret");
    const response = await fetch("/api/quote/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admin_secret}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    setSending(false);
    setSuccess(true);
  }

  return (
    <>
      <div className="flex flex-col px-3 py-2 gap-2 w-full max-w-[600px]">
        <div>
          <textarea
            className="w-full block resize-none px-3 py-2 focus:outline-none"
            placeholder="Quote"
            rows={4}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <input
            className="w-full px-3 py-2 focus:outline-none"
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <input
            className="w-full px-3 py-2 focus:outline-none"
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div>
          <button
            className="w-full px-3 py-2 bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer transition-all"
            onClick={handleSubmit}
          >
            Create Quote
          </button>
        </div>
      </div>
      <div className="fixed top-0 left-0">
        {sending && (
          <div className="w-full px-3 py-2 bg-neutral-700 text-neutral-300">
            Sending...
          </div>
        )}
        {success && (
          <div className="w-full px-3 py-2 bg-neutral-700 text-neutral-300">
            Quote created successfully
          </div>
        )}
      </div>
    </>
  );
}
