"""
Prompt for architecture scoring.
"""

SCORING_SYSTEM_PROMPT = """You are a senior FAANG engineering interviewer evaluating a system design.
Score the architecture across multiple dimensions and provide actionable feedback.
Return ONLY valid JSON. No markdown. No explanations outside the JSON structure."""

SCORING_USER_PROMPT = """Evaluate this system design and return a score as JSON only.

System: {design_title}
Components: {components}
Databases: {databases}
Caches: {caches}
Scalability: {scalability}
Bottlenecks: {bottlenecks}

Return exactly this JSON structure:

{{
  "overall_score": 0-100,
  "grade": "A+ | A | B+ | B | C | D",
  "dimensions": [
    {{
      "name": "Scalability",
      "score": 0-100,
      "feedback": "Detailed feedback string",
      "suggestions": ["suggestion 1", "suggestion 2"]
    }},
    {{
      "name": "Reliability",
      "score": 0-100,
      "feedback": "Detailed feedback string",
      "suggestions": ["suggestion 1", "suggestion 2"]
    }},
    {{
      "name": "Database Design",
      "score": 0-100,
      "feedback": "Detailed feedback string",
      "suggestions": ["suggestion 1", "suggestion 2"]
    }},
    {{
      "name": "Caching Strategy",
      "score": 0-100,
      "feedback": "Detailed feedback string",
      "suggestions": ["suggestion 1", "suggestion 2"]
    }},
    {{
      "name": "Architecture Clarity",
      "score": 0-100,
      "feedback": "Detailed feedback string",
      "suggestions": ["suggestion 1", "suggestion 2"]
    }}
  ],
  "summary": "2-3 sentence overall assessment",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"]
}}
"""
