# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""
FinÉclairé Finance Advisor Agent

This agent is responsible ONLY for explaining:
- User financial metrics
- Behavior-based probabilities
- System-generated recommended actions
- Financial insights and clarifications

It does NOT calculate, predict, or recommend trades.
"""

from google.adk.agents import LlmAgent
from .prompt import FIN_ECLAIRE_ADVISOR_PROMPT

MODEL = "gemini-2.5-pro"


fin_eclaire_advisor = LlmAgent(
    name="fin_eclaire_advisor",
    model=MODEL,
    description=(
        "Explain financial metrics, probabilities, and recommended actions "
        "using grounded financial principles. This agent is explanatory only."
    ),
    instruction=FIN_ECLAIRE_ADVISOR_PROMPT,
    output_key="fin_eclaire_advisor_output",
)

# ADK entry point
root_agent = fin_eclaire_advisor
