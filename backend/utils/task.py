tasks_by_stage = {
    1: ["Clearly define and articulate your business idea.", "Conduct initial research to assess the feasibility of the idea."],
    2: ["Develop a small-scale prototype to demonstrate the viability of the concept.", "Gather data and feedback from a limited audience to validate the idea."],
    3: ["Create a compelling pitch deck outlining the problem, solution, market, and business model.", "Practice and refine the pitch to effectively communicate the business concept."],
    4: ["Outline the step-by-step workflow of your product or service.", "Identify potential bottlenecks and areas for improvement in the workflow."],
    5: ["Develop a detailed design for the product prototype.", "Ensure that the design aligns with the workflow and user requirements."],
    6: ["Conduct a comprehensive intellectual property search.", "File for copyright or patent protection for your unique ideas or processes."],
    7: ["Build a functional prototype based on the design.", "Test the prototype for functionality and user experience."],
    8: ["Conduct extensive market research to understand the target audience.", "Analyze competitors and identify unique selling points."],
    9: ["Analyze market trends, potential growth, and risks.", "Define a market strategy based on the research findings."],
    10: ["Register the business legally with the appropriate authorities.", "Establish a legal structure for the company (e.g., LLC, corporation)."],
    11: ["Launch the product or service on a small scale.", "Collect real-world data on user engagement and product performance."],
    12: ["Gather feedback from early adopters.", "Conduct surveys to understand customer satisfaction and areas for improvement."],
    13: ["Analyze customer feedback and implement necessary improvements.", "Iteratively update the product or service based on user input."],
    14: ["Develop a comprehensive investor pitch deck.", "Clearly articulate the value proposition, market opportunity, and financial projections."],
    15: ["Identify potential investors or funding sources.", "Pitch to investors and secure necessary funding for scaling the business."]
}

def get_next_task(current_stage, task_index):
    if current_stage in tasks_by_stage and task_index < len(tasks_by_stage[current_stage]):
        return current_stage, tasks_by_stage[current_stage][task_index]
    elif current_stage < 15:
        next_stage = current_stage + 1
        return next_stage, f"Congratulations! You have completed all tasks for Stage {current_stage}. Proceed to Stage {next_stage}. The first task is: {tasks_by_stage[next_stage][0]}"
    else:
        return None, "Congratulations! You have completed all tasks for the final stage."

# Example usage:
current_stage = int(input("Enter your current stage number: "))
task_index = 0

while current_stage is not None:
    current_stage, current_task = get_next_task(current_stage, task_index)
    
    if "Congratulations!" in current_task:
        print(current_task)
        break
    
    print("\nCurrent Stage:", current_stage)
    print("Current Task:", current_task)
    input("Click 'Next' after completing the task. Press Enter to continue...")
    
    task_index += 1
    if task_index == len(tasks_by_stage[current_stage]):
        current_stage += 1
        task_index = 0
