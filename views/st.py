def calculate_average_mark(marks):
   
    total_marks = sum(marks.values())
    num_subjects = len(marks)
    average_mark = total_marks / num_subjects
    return average_mark

def main():
    marks = {"ICT": 35, "MATH": 54, "ENG": 47}
    average = calculate_average_mark(marks)
    print("Average mark:", average)

if __name__ == "__main__":
    main()
