export default async function handler(req, res) {
  const { GITHUB_TOKEN, GIST_ID } = process.env;
  try {
    const r = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!r.ok) return res.status(500).json({ error: "Failed to fetch" });
    const gist = await r.json();
    const value = gist.files?.["budget.json"]?.content ?? null;
    res.json({ value });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
