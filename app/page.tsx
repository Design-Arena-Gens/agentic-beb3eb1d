'use client'

import { useState } from 'react'

interface ScheduleDay {
  day: number
  title: string
  tasks: string[]
  focusArea: string
}

export default function Home() {
  const [topic, setTopic] = useState('')
  const [days, setDays] = useState('')
  const [schedule, setSchedule] = useState<ScheduleDay[]>([])
  const [loading, setLoading] = useState(false)

  const generateSchedule = (topic: string, totalDays: number): ScheduleDay[] => {
    const schedule: ScheduleDay[] = []

    const phases = [
      { name: 'Foundation', percentage: 0.25 },
      { name: 'Core Concepts', percentage: 0.35 },
      { name: 'Advanced Topics', percentage: 0.25 },
      { name: 'Practice & Review', percentage: 0.15 }
    ]

    let currentDay = 1

    phases.forEach((phase, phaseIndex) => {
      const phaseDays = Math.max(1, Math.round(totalDays * phase.percentage))
      const endDay = Math.min(currentDay + phaseDays - 1, totalDays)

      for (let day = currentDay; day <= endDay && day <= totalDays; day++) {
        const dayInPhase = day - currentDay + 1
        const isFirstDay = day === currentDay
        const isLastDay = day === endDay

        let daySchedule: ScheduleDay = {
          day: day,
          title: '',
          tasks: [],
          focusArea: phase.name
        }

        if (phaseIndex === 0) {
          // Foundation Phase
          if (isFirstDay) {
            daySchedule.title = `Introduction to ${topic}`
            daySchedule.tasks = [
              `Research and understand what ${topic} is`,
              'Watch introductory videos or read overview articles',
              'Identify key terminology and concepts',
              'Set up learning environment/tools if needed'
            ]
          } else {
            daySchedule.title = `${topic} Fundamentals - Part ${dayInPhase}`
            daySchedule.tasks = [
              'Review basic concepts and terminology',
              'Study fundamental principles',
              'Take notes on key definitions',
              'Complete beginner exercises'
            ]
          }
        } else if (phaseIndex === 1) {
          // Core Concepts Phase
          daySchedule.title = `Core ${topic} Concepts - Day ${dayInPhase}`
          daySchedule.tasks = [
            'Deep dive into main concepts',
            'Work through practical examples',
            'Practice with hands-on exercises',
            'Review and summarize learnings'
          ]
        } else if (phaseIndex === 2) {
          // Advanced Topics Phase
          daySchedule.title = `Advanced ${topic} - Day ${dayInPhase}`
          daySchedule.tasks = [
            'Study advanced techniques and methods',
            'Explore real-world applications',
            'Work on complex problems',
            'Connect concepts to practical use cases'
          ]
        } else {
          // Practice & Review Phase
          if (isLastDay) {
            daySchedule.title = `${topic} Final Review & Assessment`
            daySchedule.tasks = [
              'Complete comprehensive review of all topics',
              'Take final assessment or quiz',
              'Create summary cheat sheet',
              'Plan next steps for continued learning'
            ]
          } else {
            daySchedule.title = `${topic} Practice & Application - Day ${dayInPhase}`
            daySchedule.tasks = [
              'Work on practical projects',
              'Apply learned concepts',
              'Review challenging areas',
              'Build confidence through repetition'
            ]
          }
        }

        schedule.push(daySchedule)
      }

      currentDay = endDay + 1
    })

    return schedule
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!topic.trim() || !days.trim()) {
      alert('Please fill in all fields')
      return
    }

    const totalDays = parseInt(days)
    if (isNaN(totalDays) || totalDays < 1 || totalDays > 365) {
      alert('Please enter a valid number of days (1-365)')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const generatedSchedule = generateSchedule(topic, totalDays)
      setSchedule(generatedSchedule)
      setLoading(false)
    }, 500)
  }

  const handleReset = () => {
    setTopic('')
    setDays('')
    setSchedule([])
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-3">
            📚 Learning Schedule Generator
          </h1>
          <p className="text-lg text-gray-700">
            Create a personalized study plan for any topic
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">
                What do you want to learn?
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Python Programming, Spanish, Digital Marketing..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="days" className="block text-sm font-semibold text-gray-700 mb-2">
                How many days to reach your goal?
              </label>
              <input
                type="number"
                id="days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="e.g., 30"
                min="1"
                max="365"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate Schedule'}
              </button>

              {schedule.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>

        {schedule.length > 0 && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-2">
                Your {days}-Day {topic} Learning Plan
              </h2>
              <p className="text-gray-600">
                Follow this structured plan to master {topic} in {days} days
              </p>
            </div>

            {schedule.map((day) => (
              <div
                key={day.day}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    {day.day}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {day.title}
                      </h3>
                      <span className="text-xs font-semibold px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                        {day.focusArea}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {day.tasks.map((task, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="text-indigo-500 mt-1">✓</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md p-6 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">🎉 You've got this!</h3>
              <p className="text-indigo-100">
                Stay consistent and you'll master {topic} in {days} days
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
