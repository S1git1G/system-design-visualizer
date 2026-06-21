"""
Prompt for interview practice question generation.
"""

INTERVIEW_SYSTEM_PROMPT = """You are a senior FAANG system design interviewer.
Generate challenging, realistic system design interview questions for a given system.
Return ONLY valid JSON. No markdown. No explanations outside JSON."""

INTERVIEW_USER_PROMPT = """Generate {num_questions} system design interview questions for this system.

System: {design_title}
Key Components: {components}

Return exactly this JSON structure:

{{
  "design_title": "{design_title}",
  "questions": [
    {{
      "id": "q1",
      "question": "The interview question text",
      "category": "scalability | database | architecture | tradeoffs | estimation",
      "difficulty": "easy | medium | hard",
      "hint": "A subtle hint without giving away the answer",
      "model_answer": "A comprehensive 3-5 sentence model answer a strong candidate would give",
      "follow_ups": ["follow up question 1", "follow up question 2"]
    }}
  ]
}}

Make questions progressively harder. Cover: capacity estimation, database sharding, caching, CAP theorem, failure scenarios, and trade-offs.
"""
