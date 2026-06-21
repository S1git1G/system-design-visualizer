"""
Pydantic schemas for the System Design API.
All request/response models are defined here.
"""
from pydantic import BaseModel, Field
from typing import List, Optional


# ---- Request ----

class DesignRequest(BaseModel):
    query: str = Field(..., min_length=3, max_length=500, description="The system design prompt")

    model_config = {
        "json_schema_extra": {
            "examples": [{"query": "Design Netflix"}]
        }
    }


# ---- Diagram Nodes & Edges ----

class NodePosition(BaseModel):
    x: float = 0.0
    y: float = 0.0


class NodeSchema(BaseModel):
    id: str
    label: str
    type: str = Field(
        description="Node category: client | server | database | cache | queue | cdn | gateway | service | storage | monitoring"
    )
    position: Optional[NodePosition] = None
    description: Optional[str] = None


class EdgeSchema(BaseModel):
    source: str
    target: str
    label: Optional[str] = None
    animated: Optional[bool] = False


# ---- Main Response ----

class DesignResponse(BaseModel):
    title: str
    query: str
    functional_requirements: List[str]
    non_functional_requirements: List[str]
    components: List[str]
    databases: List[str]
    caches: List[str]
    scalability_considerations: List[str]
    bottlenecks: List[str]
    interview_questions: List[str]
    nodes: List[NodeSchema]
    edges: List[EdgeSchema]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "title": "Netflix System Design",
                    "query": "Design Netflix",
                    "functional_requirements": ["Stream video content", "User authentication"],
                    "non_functional_requirements": ["99.99% uptime", "< 200ms latency"],
                    "components": ["Video Streaming Service", "CDN", "Recommendation Engine"],
                    "databases": ["Cassandra for user data", "MySQL for metadata"],
                    "caches": ["Redis for session management", "Memcached for content metadata"],
                    "scalability_considerations": ["Horizontal scaling for streaming servers"],
                    "bottlenecks": ["Video transcoding pipeline"],
                    "interview_questions": ["How would you handle 1M concurrent users?"],
                    "nodes": [
                        {"id": "client", "label": "Client App", "type": "client"},
                        {"id": "api_gateway", "label": "API Gateway", "type": "gateway"}
                    ],
                    "edges": [
                        {"source": "client", "target": "api_gateway", "label": "HTTPS"}
                    ]
                }
            ]
        }
    }
