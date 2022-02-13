import { SurveyModel } from './../models/survey-model'
import faker from 'faker'

export const mockSurveyList = (): SurveyModel[] => [
  {
    id: faker.random.alphaNumeric(20),
    question: faker.random.words(10),
    answers: [
      {
        answer: faker.random.words(5)
      },
      {
        answer: faker.random.words(4)
      }
    ],
    didAnswer: faker.helpers.randomize([false, true]),
    date: faker.date.recent()
  }
]
