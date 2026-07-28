import { NextResponse } from "next/server";
import { generateReply, type ChatTurn } from "@/lib/ai/gemini";
import { createClient } from "@/lib/supabase/server";
import { getProducts, getProjects, getCertifications, getCompanyStats } from "@/lib/data";

const FALLBACK_REPLY =
  "I'm not able to answer that right now. For a fast response, WhatsApp us at +91 99661 09191, " +
  "email info@sportsurf.in, or use the Get a Quote form and our team will get back to you.";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const history: ChatTurn[] = Array.isArray(body?.history) ? body.history : [];

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const [products, projects, certifications, stats] = await Promise.all([
    getProducts(),
    getProjects(),
    getCertifications(),
    getCompanyStats(),
  ]);

  const systemPrompt = `You are the site assistant for SportSurf India, a sports-infrastructure
company that designs, builds, and outfits sports facilities — ${stats.projectsCompleted} projects
across ${stats.statesServed} states.

Product catalog: ${JSON.stringify(products.map((p) => ({ name: p.name, category: p.category, description: p.description })))}

Recent projects: ${JSON.stringify(projects.map((p) => ({ title: p.title, location: p.location, state: p.state, category: p.category })))}

Certifications: ${JSON.stringify(certifications.map((c) => c.name))}

Answer visitor questions about products, projects, certifications, and the quote process
using only this information. Keep answers short (2-4 sentences) and friendly. If a visitor
wants a quote, point them to the "Get a Quote" page. If you don't know the answer, say so
and suggest contacting +91 99661 09191 or info@sportsurf.in — never invent facts not in the
context above.`;

  const reply = await generateReply(systemPrompt, [...history, { role: "user", text: message }]);
  const finalReply = reply ?? FALLBACK_REPLY;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.from("chat_queries").insert({
    user_id: user?.id ?? null,
    source: "chatbot",
    query: message,
    response: finalReply,
  });

  return NextResponse.json({ reply: finalReply });
}
