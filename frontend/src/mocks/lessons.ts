import type { 
  Lesson, 
  UserLessonProgress, 
  LessonWithProgress 
} from '../types/lesson';

// Mock Lessons data matching database schema
export const mockLessons: Lesson[] = [
  {
    id: 'lesson-001',
    title: 'Task 2 – Viết mở bài hiệu quả',
    description: 'Học cách viết mở bài ấn tượng, giới thiệu vấn đề và nêu quan điểm rõ ràng trong bài luận IELTS Task 2.',
    category: 'Task2',
    difficulty: 'Beginner',
    bandLevel: 6.0,
    focusArea: 'TaskAchievement',
    estimatedDurationMinutes: 25,
    orderIndex: 1,
    isPublished: true,
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-01-20T10:30:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Tại sao mở bài quan trọng?'
        },
        {
          id: 'sec-2',
          type: 'paragraph',
          content: 'Mở bài là ấn tượng đầu tiên với giám khảo. Một mở bài tốt cần paraphrase đề bài và nêu rõ quan điểm của bạn trong 2-3 câu.'
        },
        {
          id: 'sec-3',
          type: 'tip',
          content: 'Không copy nguyên văn đề bài. Hãy sử dụng từ đồng nghĩa và cấu trúc câu khác để paraphrase.'
        },
        {
          id: 'sec-4',
          type: 'heading',
          content: 'Cấu trúc mở bài chuẩn'
        },
        {
          id: 'sec-5',
          type: 'bulletList',
          content: '',
          items: [
            'Câu 1: Paraphrase đề bài (giới thiệu chủ đề)',
            'Câu 2: Nêu quan điểm cá nhân (thesis statement)',
            'Câu 3 (tùy chọn): Giới thiệu nội dung sẽ thảo luận'
          ]
        },
        {
          id: 'sec-6',
          type: 'example',
          content: 'Đề: "Some people think that universities should provide graduates with the knowledge and skills needed in the workplace." → Mở bài: "It is often argued that higher education institutions should equip students with practical competencies for their future careers. I strongly agree with this viewpoint and will discuss the benefits in the following essay."'
        },
        {
          id: 'sec-7',
          type: 'highlight',
          content: 'Lưu ý: Mở bài nên chiếm khoảng 40-50 từ, không quá dài hoặc quá ngắn.'
        }
      ]
    }
  },
  {
    id: 'lesson-002',
    title: 'Grammar: Câu phức trong IELTS Writing',
    description: 'Nắm vững cách sử dụng câu phức (complex sentences) để tăng điểm Grammar Range & Accuracy.',
    category: 'Grammar',
    difficulty: 'Intermediate',
    bandLevel: 6.5,
    focusArea: 'GrammarRangeAccuracy',
    estimatedDurationMinutes: 35,
    orderIndex: 2,
    isPublished: true,
    createdAt: '2025-01-16T09:00:00Z',
    updatedAt: '2025-01-21T11:00:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Câu phức là gì?'
        },
        {
          id: 'sec-2',
          type: 'paragraph',
          content: 'Câu phức (complex sentence) là câu có một mệnh đề độc lập và ít nhất một mệnh đề phụ thuộc, được nối bởi các liên từ như because, although, while, if, when...'
        },
        {
          id: 'sec-3',
          type: 'heading',
          content: 'Các loại mệnh đề phụ thuộc'
        },
        {
          id: 'sec-4',
          type: 'bulletList',
          content: '',
          items: [
            'Mệnh đề chỉ nguyên nhân: because, since, as',
            'Mệnh đề chỉ sự tương phản: although, even though, while',
            'Mệnh đề chỉ điều kiện: if, unless, provided that',
            'Mệnh đề chỉ thời gian: when, while, before, after'
          ]
        },
        {
          id: 'sec-5',
          type: 'example',
          content: '"Although online learning offers flexibility, it may lack the social interaction that traditional classrooms provide." – Câu này sử dụng mệnh đề chỉ sự tương phản.'
        },
        {
          id: 'sec-6',
          type: 'tip',
          content: 'Kết hợp câu đơn và câu phức trong bài viết. Sử dụng 100% câu phức sẽ khiến bài viết khó đọc.'
        }
      ]
    }
  },
  {
    id: 'lesson-003',
    title: 'Vocabulary cho chủ đề Education',
    description: 'Học từ vựng band cao và collocations thường gặp trong chủ đề Giáo dục để cải thiện Lexical Resource.',
    category: 'Vocabulary',
    difficulty: 'Intermediate',
    bandLevel: 7.0,
    focusArea: 'LexicalResource',
    estimatedDurationMinutes: 30,
    orderIndex: 3,
    isPublished: true,
    createdAt: '2025-01-17T10:00:00Z',
    updatedAt: '2025-01-22T12:00:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Từ vựng cốt lõi về Education'
        },
        {
          id: 'sec-2',
          type: 'bulletList',
          content: '',
          items: [
            'academic achievement - thành tích học tập',
            'curriculum - chương trình giảng dạy',
            'vocational training - đào tạo nghề',
            'lifelong learning - học tập suốt đời',
            'critical thinking - tư duy phản biện'
          ]
        },
        {
          id: 'sec-3',
          type: 'heading',
          content: 'Collocations phổ biến'
        },
        {
          id: 'sec-4',
          type: 'bulletList',
          content: '',
          items: [
            'pursue higher education - theo đuổi giáo dục đại học',
            'acquire knowledge - tiếp thu kiến thức',
            'develop practical skills - phát triển kỹ năng thực tế',
            'foster creativity - nuôi dưỡng sự sáng tạo',
            'meet academic requirements - đáp ứng yêu cầu học thuật'
          ]
        },
        {
          id: 'sec-5',
          type: 'example',
          content: '"Universities should focus on fostering creativity and developing practical skills rather than merely transmitting theoretical knowledge."'
        },
        {
          id: 'sec-6',
          type: 'tip',
          content: 'Học từ vựng theo chủ đề và collocations thay vì học từ đơn lẻ sẽ giúp bạn sử dụng từ tự nhiên hơn.'
        }
      ]
    }
  },
  {
    id: 'lesson-004',
    title: 'Task 1 Academic – Mô tả biểu đồ đường',
    description: 'Học cách phân tích và mô tả xu hướng trong biểu đồ đường (line graph) một cách logic và mạch lạc.',
    category: 'Task1Academic',
    difficulty: 'Beginner',
    bandLevel: 6.0,
    focusArea: 'TaskAchievement',
    estimatedDurationMinutes: 30,
    orderIndex: 4,
    isPublished: true,
    createdAt: '2025-01-18T08:30:00Z',
    updatedAt: '2025-01-23T09:00:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Cấu trúc bài viết Task 1 Line Graph'
        },
        {
          id: 'sec-2',
          type: 'bulletList',
          content: '',
          items: [
            'Đoạn 1: Paraphrase đề bài + Overview',
            'Đoạn 2: Mô tả chi tiết xu hướng chính',
            'Đoạn 3: Mô tả xu hướng phụ và so sánh'
          ]
        },
        {
          id: 'sec-3',
          type: 'heading',
          content: 'Từ vựng mô tả xu hướng'
        },
        {
          id: 'sec-4',
          type: 'bulletList',
          content: '',
          items: [
            'Tăng: increase, rise, grow, climb, surge',
            'Giảm: decrease, decline, drop, fall, plummet',
            'Ổn định: remain stable, stay constant, level off',
            'Dao động: fluctuate, vary'
          ]
        },
        {
          id: 'sec-5',
          type: 'tip',
          content: 'Luôn bắt đầu với overview – đây là phần quan trọng nhất để đạt band 6+.'
        }
      ]
    }
  },
  {
    id: 'lesson-005',
    title: 'Coherence & Cohesion – Liên kết đoạn văn',
    description: 'Học cách sử dụng linking words và cấu trúc đoạn văn để bài viết mạch lạc, logic hơn.',
    category: 'Grammar',
    difficulty: 'Intermediate',
    bandLevel: 6.5,
    focusArea: 'CoherenceCohesion',
    estimatedDurationMinutes: 25,
    orderIndex: 5,
    isPublished: true,
    createdAt: '2025-01-19T10:00:00Z',
    updatedAt: '2025-01-24T11:30:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Linking Words theo chức năng'
        },
        {
          id: 'sec-2',
          type: 'bulletList',
          content: '',
          items: [
            'Thêm ý: Furthermore, Moreover, In addition, Additionally',
            'Tương phản: However, Nevertheless, On the other hand, Conversely',
            'Nguyên nhân - kết quả: Therefore, Consequently, As a result, Thus',
            'Ví dụ: For example, For instance, Such as, Namely'
          ]
        },
        {
          id: 'sec-3',
          type: 'heading',
          content: 'Cấu trúc đoạn văn PEEL'
        },
        {
          id: 'sec-4',
          type: 'bulletList',
          content: '',
          items: [
            'P - Point: Nêu ý chính của đoạn',
            'E - Explain: Giải thích ý chính',
            'E - Example: Đưa ra ví dụ minh họa',
            'L - Link: Liên kết lại với luận điểm chính'
          ]
        },
        {
          id: 'sec-5',
          type: 'highlight',
          content: 'Không lạm dụng linking words. Sử dụng 1-2 linking words mỗi đoạn là đủ.'
        }
      ]
    }
  },
  {
    id: 'lesson-006',
    title: 'Task 2 – Phát triển ý tưởng nâng cao',
    description: 'Học cách brainstorm và phát triển ý tưởng sâu sắc cho các dạng đề phức tạp trong IELTS Task 2.',
    category: 'Task2',
    difficulty: 'Advanced',
    bandLevel: 7.5,
    focusArea: 'TaskAchievement',
    estimatedDurationMinutes: 40,
    orderIndex: 6,
    isPublished: true,
    createdAt: '2025-01-20T09:00:00Z',
    updatedAt: '2025-01-25T10:00:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Phương pháp brainstorm hiệu quả'
        },
        {
          id: 'sec-2',
          type: 'paragraph',
          content: 'Để đạt band 7+, bạn cần ý tưởng sâu sắc và được phát triển đầy đủ. Áp dụng kỹ thuật 5W1H để brainstorm: What, Why, Who, When, Where, How.'
        },
        {
          id: 'sec-3',
          type: 'heading',
          content: 'Kỹ thuật phát triển ý (Idea Extension)'
        },
        {
          id: 'sec-4',
          type: 'bulletList',
          content: '',
          items: [
            'Giải thích tại sao ý đó quan trọng',
            'Đưa ra ví dụ cụ thể và thực tế',
            'Phân tích hậu quả hoặc kết quả',
            'Liên hệ với thực tế hoặc nghiên cứu'
          ]
        },
        {
          id: 'sec-5',
          type: 'example',
          content: 'Ý: "Technology improves education." → Phát triển: "Digital tools such as interactive simulations and virtual laboratories enable students to conduct experiments that would otherwise be impossible due to cost or safety constraints, thereby enhancing their practical understanding of scientific concepts."'
        },
        {
          id: 'sec-6',
          type: 'tip',
          content: 'Mỗi body paragraph nên có ít nhất 3-4 câu để phát triển ý đầy đủ.'
        }
      ]
    }
  },
  {
    id: 'lesson-007',
    title: 'Task 1 General – Viết thư trang trọng',
    description: 'Học cách viết thư trang trọng (formal letter) trong IELTS General Training Task 1.',
    category: 'Task1General',
    difficulty: 'Beginner',
    bandLevel: 6.0,
    focusArea: 'TaskAchievement',
    estimatedDurationMinutes: 25,
    orderIndex: 7,
    isPublished: true,
    createdAt: '2025-01-21T08:00:00Z',
    updatedAt: '2025-01-26T09:30:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Cấu trúc thư trang trọng'
        },
        {
          id: 'sec-2',
          type: 'bulletList',
          content: '',
          items: [
            'Lời chào mở đầu: Dear Sir/Madam, Dear Mr./Ms. [Name]',
            'Đoạn 1: Nêu mục đích viết thư',
            'Đoạn 2-3: Nội dung chính (theo yêu cầu đề)',
            'Kết thư: Yours faithfully / Yours sincerely'
          ]
        },
        {
          id: 'sec-3',
          type: 'highlight',
          content: 'Dùng "Yours faithfully" khi không biết tên người nhận, "Yours sincerely" khi biết tên.'
        },
        {
          id: 'sec-4',
          type: 'heading',
          content: 'Ngôn ngữ trang trọng'
        },
        {
          id: 'sec-5',
          type: 'bulletList',
          content: '',
          items: [
            'Không viết tắt: do not thay vì don\'t',
            'Tránh từ lóng và thông tục',
            'Sử dụng câu phức và từ vựng formal'
          ]
        }
      ]
    }
  },
  {
    id: 'lesson-008',
    title: 'Vocabulary cho chủ đề Environment',
    description: 'Từ vựng và collocations band cao về Môi trường – một trong những chủ đề phổ biến nhất trong IELTS.',
    category: 'Vocabulary',
    difficulty: 'Advanced',
    bandLevel: 7.0,
    focusArea: 'LexicalResource',
    estimatedDurationMinutes: 35,
    orderIndex: 8,
    isPublished: true,
    createdAt: '2025-01-22T10:00:00Z',
    updatedAt: '2025-01-27T11:00:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Từ vựng cốt lõi về Environment'
        },
        {
          id: 'sec-2',
          type: 'bulletList',
          content: '',
          items: [
            'carbon footprint - lượng khí thải carbon',
            'biodiversity - đa dạng sinh học',
            'sustainable development - phát triển bền vững',
            'renewable energy - năng lượng tái tạo',
            'ecological balance - cân bằng sinh thái'
          ]
        },
        {
          id: 'sec-3',
          type: 'heading',
          content: 'Collocations nâng cao'
        },
        {
          id: 'sec-4',
          type: 'bulletList',
          content: '',
          items: [
            'mitigate climate change - giảm thiểu biến đổi khí hậu',
            'preserve natural habitats - bảo tồn môi trường sống tự nhiên',
            'implement environmental policies - thực thi chính sách môi trường',
            'raise public awareness - nâng cao nhận thức cộng đồng'
          ]
        },
        {
          id: 'sec-5',
          type: 'example',
          content: '"Governments should implement stringent environmental policies to mitigate climate change and preserve biodiversity for future generations."'
        }
      ]
    }
  },
  {
    id: 'lesson-009',
    title: 'Grammar: Passive Voice trong Academic Writing',
    description: 'Học cách sử dụng câu bị động phù hợp để bài viết academic và professional hơn.',
    category: 'Grammar',
    difficulty: 'Intermediate',
    bandLevel: 6.5,
    focusArea: 'GrammarRangeAccuracy',
    estimatedDurationMinutes: 30,
    orderIndex: 9,
    isPublished: true,
    createdAt: '2025-01-23T09:00:00Z',
    updatedAt: '2025-01-28T10:00:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Khi nào dùng Passive Voice?'
        },
        {
          id: 'sec-2',
          type: 'bulletList',
          content: '',
          items: [
            'Khi chủ thể hành động không quan trọng hoặc không rõ',
            'Khi muốn nhấn mạnh đối tượng chịu tác động',
            'Trong văn phong academic và báo cáo',
            'Mô tả quy trình trong Task 1'
          ]
        },
        {
          id: 'sec-3',
          type: 'example',
          content: 'Active: "The government banned plastic bags." → Passive: "Plastic bags were banned by the government." (hoặc "Plastic bags were banned.")'
        },
        {
          id: 'sec-4',
          type: 'tip',
          content: 'Trong Task 1 Process, sử dụng passive voice là bắt buộc để mô tả các bước quy trình.'
        },
        {
          id: 'sec-5',
          type: 'highlight',
          content: 'Cân bằng giữa active và passive voice. Không nên dùng quá nhiều câu bị động.'
        }
      ]
    }
  },
  {
    id: 'lesson-010',
    title: 'Task 1 Academic – Mô tả biểu đồ tròn',
    description: 'Phân tích và mô tả biểu đồ tròn (pie chart) với từ vựng và cấu trúc câu phù hợp.',
    category: 'Task1Academic',
    difficulty: 'Beginner',
    bandLevel: 6.0,
    focusArea: 'TaskAchievement',
    estimatedDurationMinutes: 25,
    orderIndex: 10,
    isPublished: true,
    createdAt: '2025-01-24T08:00:00Z',
    updatedAt: '2025-01-29T09:00:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Đặc điểm biểu đồ tròn'
        },
        {
          id: 'sec-2',
          type: 'paragraph',
          content: 'Biểu đồ tròn thể hiện tỷ lệ phần trăm của các thành phần trong một tổng thể. Khi mô tả, cần focus vào so sánh các phần và nhấn mạnh phần lớn nhất/nhỏ nhất.'
        },
        {
          id: 'sec-3',
          type: 'heading',
          content: 'Từ vựng mô tả tỷ lệ'
        },
        {
          id: 'sec-4',
          type: 'bulletList',
          content: '',
          items: [
            'Chiếm phần lớn: account for, represent, comprise, make up',
            'Một phần nhỏ: a small proportion, a minority',
            'Ngang nhau: equal, the same proportion',
            'Còn lại: the remainder, the rest'
          ]
        },
        {
          id: 'sec-5',
          type: 'example',
          content: '"Renewable energy accounted for the largest proportion at 45%, while nuclear power represented only a small fraction of the total energy consumption."'
        }
      ]
    }
  },
  {
    id: 'lesson-011',
    title: 'Task 2 – Viết kết luận ấn tượng',
    description: 'Học cách viết kết luận ngắn gọn, súc tích và để lại ấn tượng tốt với giám khảo.',
    category: 'Task2',
    difficulty: 'Intermediate',
    bandLevel: 6.5,
    focusArea: 'TaskAchievement',
    estimatedDurationMinutes: 20,
    orderIndex: 11,
    isPublished: true,
    createdAt: '2025-01-25T10:00:00Z',
    updatedAt: '2025-01-30T11:00:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Mục đích của kết luận'
        },
        {
          id: 'sec-2',
          type: 'paragraph',
          content: 'Kết luận tóm tắt lại quan điểm chính và củng cố luận điểm của bạn. Không nên đưa ý mới vào kết luận.'
        },
        {
          id: 'sec-3',
          type: 'heading',
          content: 'Cấu trúc kết luận'
        },
        {
          id: 'sec-4',
          type: 'bulletList',
          content: '',
          items: [
            'Câu mở đầu: In conclusion, To conclude, To sum up',
            'Tóm tắt quan điểm chính (paraphrase thesis)',
            'Câu kết (optional): Đề xuất hoặc dự đoán tương lai'
          ]
        },
        {
          id: 'sec-5',
          type: 'highlight',
          content: 'Kết luận nên khoảng 30-40 từ. Ngắn gọn và súc tích.'
        }
      ]
    }
  },
  {
    id: 'lesson-012',
    title: 'Vocabulary cho chủ đề Technology',
    description: 'Từ vựng nâng cao và expressions về Công nghệ để sử dụng trong IELTS Writing.',
    category: 'Vocabulary',
    difficulty: 'Intermediate',
    bandLevel: 6.5,
    focusArea: 'LexicalResource',
    estimatedDurationMinutes: 30,
    orderIndex: 12,
    isPublished: true,
    createdAt: '2025-01-26T09:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    contentData: {
      sections: [
        {
          id: 'sec-1',
          type: 'heading',
          content: 'Từ vựng về Technology'
        },
        {
          id: 'sec-2',
          type: 'bulletList',
          content: '',
          items: [
            'technological advancement - tiến bộ công nghệ',
            'digital revolution - cuộc cách mạng số',
            'artificial intelligence - trí tuệ nhân tạo',
            'automation - tự động hóa',
            'digital literacy - hiểu biết về công nghệ số'
          ]
        },
        {
          id: 'sec-3',
          type: 'heading',
          content: 'Collocations thông dụng'
        },
        {
          id: 'sec-4',
          type: 'bulletList',
          content: '',
          items: [
            'embrace new technology - đón nhận công nghệ mới',
            'bridge the digital divide - thu hẹp khoảng cách số',
            'enhance productivity - nâng cao năng suất',
            'pose security risks - gây ra rủi ro bảo mật'
          ]
        }
      ]
    }
  }
];

// Mock User Lesson Progress
export const mockUserLessonProgress: UserLessonProgress[] = [
  {
    id: 'progress-001',
    lessonId: 'lesson-001',
    userId: 'user-001',
    status: 'Completed',
    timeSpentMinutes: 28,
    completedAt: '2025-12-28T15:30:00Z',
    lastAccessedAt: '2025-12-28T15:30:00Z',
    createdAt: '2025-12-28T14:00:00Z',
    updatedAt: '2025-12-28T15:30:00Z'
  },
  {
    id: 'progress-002',
    lessonId: 'lesson-002',
    userId: 'user-001',
    status: 'Completed',
    timeSpentMinutes: 42,
    completedAt: '2025-12-29T10:00:00Z',
    lastAccessedAt: '2025-12-29T10:00:00Z',
    createdAt: '2025-12-29T08:30:00Z',
    updatedAt: '2025-12-29T10:00:00Z'
  },
  {
    id: 'progress-003',
    lessonId: 'lesson-003',
    userId: 'user-001',
    status: 'InProgress',
    timeSpentMinutes: 15,
    completedAt: null,
    lastAccessedAt: '2025-12-30T14:00:00Z',
    createdAt: '2025-12-30T13:45:00Z',
    updatedAt: '2025-12-30T14:00:00Z'
  },
  {
    id: 'progress-004',
    lessonId: 'lesson-004',
    userId: 'user-001',
    status: 'InProgress',
    timeSpentMinutes: 8,
    completedAt: null,
    lastAccessedAt: '2025-12-31T09:00:00Z',
    createdAt: '2025-12-31T08:52:00Z',
    updatedAt: '2025-12-31T09:00:00Z'
  },
  {
    id: 'progress-005',
    lessonId: 'lesson-005',
    userId: 'user-001',
    status: 'Completed',
    timeSpentMinutes: 30,
    completedAt: '2025-12-27T16:00:00Z',
    lastAccessedAt: '2025-12-27T16:00:00Z',
    createdAt: '2025-12-27T15:30:00Z',
    updatedAt: '2025-12-27T16:00:00Z'
  }
];

// Helper function to combine lessons with progress
export function getLessonsWithProgress(): LessonWithProgress[] {
  return mockLessons.map(lesson => {
    const progress = mockUserLessonProgress.find(p => p.lessonId === lesson.id);
    return {
      ...lesson,
      progress
    };
  });
}

// Helper function to get lesson by ID
export function getLessonById(id: string): LessonWithProgress | undefined {
  const lesson = mockLessons.find(l => l.id === id);
  if (!lesson) return undefined;
  
  const progress = mockUserLessonProgress.find(p => p.lessonId === id);
  return {
    ...lesson,
    progress
  };
}

// Stats helper
export function getLessonStats() {
  const lessonsWithProgress = getLessonsWithProgress();
  const completed = lessonsWithProgress.filter(l => l.progress?.status === 'Completed').length;
  const inProgress = lessonsWithProgress.filter(l => l.progress?.status === 'InProgress').length;
  const totalTime = mockUserLessonProgress.reduce((acc, p) => acc + p.timeSpentMinutes, 0);
  
  return {
    total: mockLessons.length,
    completed,
    inProgress,
    notStarted: mockLessons.length - completed - inProgress,
    totalTimeMinutes: totalTime
  };
}
