import supabase from "../setup/dbConfig.js";

export default  async function emailFetch (req, res)  {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Enter Your Email" });

  try {
    const { data, error } = await supabase.from("subscribers").insert({ email });
    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }
    

    res.json({ success: true, message: "Email Registered" });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};