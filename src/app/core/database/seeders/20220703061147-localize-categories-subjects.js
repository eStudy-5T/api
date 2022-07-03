'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          id: 1,
          name: 'category.language',
          code: 'language',
          description: 'This is description for Language category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'category.science',
          code: 'science',
          description: 'This is description for Science category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'category.programming',
          code: 'programming',
          description: 'This is description for Programming category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'category.art',
          code: 'art',
          description: 'This is description for Programming category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'category.socialScience',
          code: 'social-science',
          description: 'This is description for Social Science category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: 'category.humanResources',
          code: 'human-resources',
          description: 'This is description for Human Resources category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: 'category.economyAndFinance',
          code: 'economy-finance',
          description: 'This is description for Economy and Finance category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          name: 'category.law',
          code: 'law',
          description: 'This is description for Law category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          name: 'category.sports',
          code: 'sports',
          description: 'This is description for Sports category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          name: 'category.natureAndEnvironment',
          code: 'nature-environment',
          description:
            'This is description for Nature and Environment category',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {
        upsertKeys: ['id'],
        updateOnDuplicate: ['name']
      }
    );

    await queryInterface.bulkInsert(
      'subjects',
      [
        {
          id: 1,
          name: 'subject.english',
          description: 'This is description for English subject',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'subject.japanese',
          description: 'This is description for Japanese subject',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'subject.chinese',
          description: 'This is description for Chinese subject',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'subject.math',
          description: 'This is description for Math subject',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'subject.physics',
          description: 'This is description for Physics subject',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: 'subject.biology',
          description: 'This is description for Biology subject',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: 'subject.chemistry',
          description: 'This is description for Chemistry subject',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          name: 'subject.javascript',
          description: 'This is description for Javascript subject',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          name: 'subject.react',
          description: 'This is description for React subject',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          name: 'subject.angular',
          description: 'This is description for Angular subject',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 11,
          name: 'subject.java',
          description: 'This is description for Java subject',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 12,
          name: 'subject.dotNet',
          description: 'This is description for .NET subject',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 13,
          name: 'subject.music',
          description: 'This is description for Music subject',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 14,
          name: 'subject.drawing',
          description: 'This is description for Drawing subject',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 15,
          name: 'subject.literary',
          description: 'This is description for Literary subject',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 16,
          name: 'subject.history',
          description: 'This is description for History subject',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 17,
          name: 'subject.geography',
          description: 'This is description for Geography subject',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 18,
          name: 'subject.humanResources',
          description: 'This is description for Human Resources subject',
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 19,
          name: 'subject.microEconomic',
          description: 'This is description for Micro-Economic subject',
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 20,
          name: 'subject.macroEconomic',
          description: 'This is description for Macro-Economic subject',
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 21,
          name: 'subject.tradingLaw',
          description: 'This is description for Trading Law subject',
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 22,
          name: 'subject.soccer',
          description: 'This is description for Soccer subject',
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 23,
          name: 'subject.chess',
          description: 'This is description for Chess subject',
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 24,
          name: 'subject.badminton',
          description: 'This is description for Badminton subject',
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 25,
          name: 'subject.biologicalDiversity',
          description: 'This is description for Biological Diversity subject',
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 26,
          name: 'subject.evolution',
          description: 'This is description for Evolution subject',
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {
        upsertKeys: ['id'],
        updateOnDuplicate: ['name']
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          id: 1,
          name: 'Language',
          code: 'language',
          description: 'This is description for Language category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Science',
          code: 'science',
          description: 'This is description for Science category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Programming',
          code: 'programming',
          description: 'This is description for Programming category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Art',
          code: 'art',
          description: 'This is description for Programming category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'Social Science',
          code: 'social-science',
          description: 'This is description for Social Science category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: 'Human Resources',
          code: 'human-resources',
          description: 'This is description for Human Resources category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: 'Economy and Finance',
          code: 'economy-finance',
          description: 'This is description for Economy and Finance category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          name: 'Law',
          code: 'law',
          description: 'This is description for Law category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          name: 'Sports',
          code: 'sports',
          description: 'This is description for Sports category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          name: 'Nature and Environment',
          code: 'nature-environment',
          description:
            'This is description for Nature and Environment category',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {
        upsertKeys: ['id'],
        updateOnDuplicate: ['name']
      }
    );

    await queryInterface.bulkInsert(
      'subjects',
      [
        {
          id: 1,
          name: 'English',
          description: 'This is description for English subject',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Japanese',
          description: 'This is description for Japanese subject',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Chinese',
          description: 'This is description for Chinese subject',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Math',
          description: 'This is description for Math subject',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'Physics',
          description: 'This is description for Physics subject',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: 'Biology',
          description: 'This is description for Biology subject',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: 'Chemistry',
          description: 'This is description for Chemistry subject',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          name: 'Javascript',
          description: 'This is description for Javascript subject',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          name: 'React',
          description: 'This is description for React subject',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          name: 'Angular',
          description: 'This is description for Angular subject',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 11,
          name: 'Java',
          description: 'This is description for Java subject',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 12,
          name: '.NET',
          description: 'This is description for .NET subject',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 13,
          name: 'Music',
          description: 'This is description for Music subject',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 14,
          name: 'Drawing',
          description: 'This is description for Drawing subject',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 15,
          name: 'Literary',
          description: 'This is description for Literary subject',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 16,
          name: 'History',
          description: 'This is description for History subject',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 17,
          name: 'Geography',
          description: 'This is description for Geography subject',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 18,
          name: 'Human Resources',
          description: 'This is description for Human Resources subject',
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 19,
          name: 'Micro-Economic',
          description: 'This is description for Micro-Economic subject',
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 20,
          name: 'Macro-Economic',
          description: 'This is description for Macro-Economic subject',
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 21,
          name: 'Trading Law',
          description: 'This is description for Trading Law subject',
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 22,
          name: 'Soccer',
          description: 'This is description for Soccer subject',
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 23,
          name: 'Chess',
          description: 'This is description for Chess subject',
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 24,
          name: 'Badminton',
          description: 'This is description for Badminton subject',
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 25,
          name: 'Biological Diversity',
          description: 'This is description for Biological Diversity subject',
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 26,
          name: 'Evolution',
          description: 'This is description for Evolution subject',
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {
        upsertKeys: ['id'],
        updateOnDuplicate: ['name']
      }
    );
  }
};
