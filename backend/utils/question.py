def check_value(answers: dict):
    answers = answers['answers']
    if answers['15'] == "yes":
        return 15
    elif answers['14'] in "Yes, we have a professional and compelling pitch deck ready to present to potential investors":
        return 14
    elif answers['13'] in "Yes, we continuously iterate based on customer feedback to enhance the user experience.":
        return 13
    elif answers['12'] in "Yes, we actively collect and analyze customer feedback to improve our product or service.":
        return 12
    elif answers['11'] in "Yes, we have conducted successful pilot programs and gathered valuable feedback.":
        return 11
    elif answers['10'] in "Yes, our company is registered and complies with all legal requirements.":
        return 10
    elif answers['9'] in "Yes, we have conducted a thorough market analysis and identified key insights.":
        return 9
    elif answers['8'] in "Yes, we have conducted in-depth market research and analysis to validate our concept.":
        return 8
    elif answers['7'] in "Yes, we are actively developing and testing the MVP with real users.":
        return 7
    elif answers['6'] in "Yes, we have obtained the necessary intellectual property protection for our concept.":
        return 6
    elif answers['5'] in "Yes, we have a fully functional prototype ready for user testing and feedback.":
        return 5
    elif answers['4'] in "Yes, we have a detailed workflow design outlining all steps and interactions.":
        return 4
    elif answers['3'] in "Yes, we have a well-developed pitch deck ready for potential investors.":
        return 3
    elif answers['2'] in "Yes, we have identified a specific problem and validated its existence through market research.":
        return 2
    elif answers['1'] in "Software/App Development":
        return 1
    else:
        return 0
