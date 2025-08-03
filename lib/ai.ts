import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AIAnalysisRequest {
  content: string
  emotion: string
  userId: string
}

export interface AIAnalysisResponse {
  summary: string
  moodInsight: string
  suggestions: string[]
  riskLevel: 'low' | 'medium' | 'high'
  shouldTriggerWarning: boolean
}

export const analyzeJournalEntry = async (request: AIAnalysisRequest): Promise<AIAnalysisResponse> => {
  try {
    const prompt = `
You are an empathetic AI wellness coach analyzing a journal entry. The user wrote about their emotions and experiences.

Journal Entry: "${request.content}"
Current Emotion: ${request.emotion}

Please provide:
1. A brief, compassionate summary of their entry (2-3 sentences)
2. An insight about their emotional state in simple terms
3. 3-4 supportive suggestions for emotional wellness
4. Assess if this indicates any concerning emotional patterns (low/medium/high risk)
5. Determine if this should trigger a wellness check-in

Format your response as JSON:
{
  "summary": "brief summary",
  "moodInsight": "emotional insight",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "riskLevel": "low|medium|high",
  "shouldTriggerWarning": true/false
}

Be supportive, non-judgmental, and focus on emotional wellness.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a compassionate AI wellness coach focused on emotional support and mental health awareness."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from AI')
    }

    // Try to parse JSON response
    try {
      const parsed = JSON.parse(response)
      return {
        summary: parsed.summary || 'Thank you for sharing your thoughts.',
        moodInsight: parsed.moodInsight || 'Your feelings are valid and important.',
        suggestions: parsed.suggestions || ['Take a deep breath', 'Practice self-compassion'],
        riskLevel: parsed.riskLevel || 'low',
        shouldTriggerWarning: parsed.shouldTriggerWarning || false,
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        summary: 'Thank you for sharing your thoughts with us.',
        moodInsight: 'Your feelings are valid and important to acknowledge.',
        suggestions: [
          'Take a few deep breaths',
          'Practice self-compassion',
          'Consider talking to someone you trust',
          'Engage in an activity that brings you joy'
        ],
        riskLevel: 'low',
        shouldTriggerWarning: false,
      }
    }
  } catch (error) {
    console.error('AI analysis error:', error)
    return {
      summary: 'Thank you for sharing your thoughts.',
      moodInsight: 'Your feelings matter and it\'s okay to feel this way.',
      suggestions: [
        'Take a moment to breathe deeply',
        'Be kind to yourself',
        'Consider reaching out to a friend or family member'
      ],
      riskLevel: 'low',
      shouldTriggerWarning: false,
    }
  }
}

export const generateDailyPrompt = async (userName: string, previousMood?: string): Promise<string> => {
  try {
    const prompt = `
Generate a thoughtful, encouraging journaling prompt for ${userName}. 

${previousMood ? `Their recent mood has been: ${previousMood}` : ''}

The prompt should be:
- Gentle and non-intrusive
- Focused on emotional awareness
- Suitable for teens and young adults
- Encouraging but not demanding
- Related to daily life and emotions

Return only the prompt text, no additional formatting.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a supportive wellness coach creating gentle journaling prompts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 100,
    })

    return completion.choices[0]?.message?.content || 
      "How are you feeling today? What's on your mind?"
  } catch (error) {
    console.error('Error generating prompt:', error)
    return "How are you feeling today? What's on your mind?"
  }
}

export const generateCoachingResponse = async (
  emotion: string,
  score: number,
  context?: string
): Promise<string> => {
  try {
    const prompt = `
You are a compassionate AI wellness coach. A user is experiencing ${emotion} with intensity level ${score}/10.

${context ? `Context: ${context}` : ''}

Provide a brief, supportive response (2-3 sentences) that:
- Acknowledges their feelings
- Offers gentle support
- Suggests a simple coping strategy
- Encourages self-compassion

Keep it warm, non-judgmental, and focused on emotional wellness.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a supportive AI wellness coach focused on emotional support."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    })

    return completion.choices[0]?.message?.content || 
      "I hear you, and your feelings are completely valid. Remember to be gentle with yourself during difficult moments."
  } catch (error) {
    console.error('Error generating coaching response:', error)
    return "I hear you, and your feelings are completely valid. Remember to be gentle with yourself during difficult moments."
  }
}

export const shouldTriggerThresholdWarning = (emotion: string, score: number): boolean => {
  // Define high-risk emotions and scores
  const highRiskEmotions = ['anger', 'sadness', 'fear']
  const highRiskScore = 8
  const mediumRiskScore = 6

  if (highRiskEmotions.includes(emotion) && score >= highRiskScore) {
    return true
  }

  if (score >= 9) {
    return true
  }

  return false
} 