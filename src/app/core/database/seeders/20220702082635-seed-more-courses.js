'use strict';

const crypto = require('crypto');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('courses', [
      {
        id: crypto.randomUUID(),
        title: 'Course English title',
        description: 'Description for Course English',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 1,
        categoryId: 1,
        subjectId: 1,
        slug: 'english-1',
        tags: null,
        type: 'MARKETING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Japanese title',
        description: 'Description for Course Japanese',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 2,
        categoryId: 1,
        subjectId: 2,
        slug: 'japanese-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Chinese title',
        description: 'Description for Course Chinese',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 3,
        categoryId: 1,
        subjectId: 3,
        slug: 'chinese-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Math title',
        description: 'Description for Course Math',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 4,
        categoryId: 2,
        subjectId: 4,
        slug: 'japanese-1',
        tags: null,
        type: 'MARKETTING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Physics title',
        description: 'Description for Course Physics',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 5,
        categoryId: 2,
        subjectId: 5,
        slug: 'physics-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 3,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'sat', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Biology title',
        description: 'Description for Course Biology',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 5,
        categoryId: 2,
        subjectId: 6,
        slug: 'bio-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Chemistry title',
        description: 'Description for Chemistry Course',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 8,
        categoryId: 2,
        subjectId: 7,
        slug: 'chem-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Javascript title',
        description: 'Description for Course Javascript',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 3,
        subjectId: 8,
        slug: 'js-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course React title',
        description: 'Description for Course React',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 3,
        subjectId: 9,
        slug: 'react-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Angular title',
        description: 'Description for Angular Course',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 3,
        subjectId: 10,
        slug: 'angular-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Java title',
        description: 'Description for Course Java',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 3,
        subjectId: 11,
        slug: 'java-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course .NET title',
        description: 'Description for Course .NET',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 3,
        subjectId: 12,
        slug: 'dotnet-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Music title',
        description: 'Description for Course Music',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 2,
        categoryId: 4,
        subjectId: 13,
        slug: 'music-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Drawing title',
        description: 'Description for Course Drawing',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 2,
        categoryId: 4,
        subjectId: 14,
        slug: 'draw-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Literary title',
        description: 'Description for Course Literary',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 10,
        categoryId: 5,
        subjectId: 15,
        slug: 'literary-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course History title',
        description: 'Description for Course History',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 11,
        categoryId: 5,
        subjectId: 16,
        slug: 'history-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Geography title',
        description: 'Description for Course Geography',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 12,
        categoryId: 5,
        subjectId: 17,
        slug: 'geo-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Human Resources title',
        description: 'Description for Course Human Resources',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 6,
        subjectId: 18,
        slug: 'hr-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Micro-Economic title',
        description: 'Description for Course Micro-Economic',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 7,
        subjectId: 19,
        slug: 'mic-eco-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Macro-Economic title',
        description: 'Description for Course Macro-Economic',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 7,
        subjectId: 20,
        slug: 'mac-eco-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Trading Law title',
        description: 'Description for Course Trading Law',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 8,
        subjectId: 21,
        slug: 'trad-law-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Soccer title',
        description: 'Description for Course Soccer',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 3,
        categoryId: 9,
        subjectId: 22,
        slug: 'soccer-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Chess title',
        description: 'Description for Course Chess',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 6,
        categoryId: 9,
        subjectId: 23,
        slug: 'chess-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Badminton title',
        description: 'Description for Course Badminton',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 7,
        categoryId: 9,
        subjectId: 24,
        slug: 'badminton-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Biological Diversity title',
        description: 'Description for Course Biological Diversity',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 10,
        subjectId: 25,
        slug: 'bio-diver-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: crypto.randomUUID(),
        title: 'Course Evolution title',
        description: 'Description for Course Evolution',
        ownerId: 'aa9251c9-3671-49d2-b940-b160afefa37c',
        eventId: null,
        link: null,
        rating: 0.0,
        currency: null,
        price: 100000,
        isOpened: true,
        isActive: true,
        grade: 13,
        categoryId: 10,
        subjectId: 26,
        slug: 'evo-1',
        tags: null,
        type: 'RUNNING',
        maxStudentNumber: 10,
        startDate: new Date('2022-07-02T08:33:44.844Z'),
        endDate: new Date('2022-09-02T08:33:44.844Z'),
        enrollmentDeadline: new Date('2022-06-25T08:33:44.844Z'),
        scheduleType: 'flexible',
        daysOfWeek: null,
        startTime: null,
        endTime: null,
        lessonNumberPerWeek: 2,
        schedules: JSON.stringify([
          {id: 1, endTime: '16:40', dayOfWeek: 'tue', startTime: '15:40'},
          {id: 2, endTime: '16:40', dayOfWeek: 'thu', startTime: '16:40'}
        ]),
        isSubmitted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('courses', null, {});
  }
};
