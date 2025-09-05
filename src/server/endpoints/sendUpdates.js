import transporter from "../setup/mailConfig.js";
import supabase from "../setup/dbConfig.js";
import getEvents from "./getEvent.js";

export default async function sendUpdates() {
    const { data: emails, error } = await supabase.from("subscribers").select("email");
    if (error) {
      console.error("Supabase error:", error);
      return;
    }
  
    const updates = await getEvents();
  
    for (const email of emails) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email.email,
        subject: "GitHub Events",
        text: updates,
      });
    }
   
  }