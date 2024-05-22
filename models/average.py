students = ['jack', 'alex', 'paul']
ict_marks = [66, 56, 60]
math_marks = [77, 67, 70]
physics_marks = [88, 78, 80]

for i in range(len(students)):
    average_marks = (ict_marks[i] + math_marks[i] + physics_marks[i]) / 3
    print("The average marks for", students[i], "are:", average_marks)

