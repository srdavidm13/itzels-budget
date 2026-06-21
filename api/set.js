export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { GITHUB_TOKEN, GIST_ID } = process.env;
  const { value } = req.body;
  try {
    const r = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files: { "budget.json": { content: value } } }),
    });
    if (!r.ok) return res.status(500).json({ error: "Failed to save" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
