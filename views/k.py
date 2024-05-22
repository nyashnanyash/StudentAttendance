def searchStud(d):
    maxAge = int(input("Enter the max age: "))  # Convert input to integer
    for k in d:
        if d[k]["age"] < maxAge:  # Compare with integer, not string
            print("Student Details:")
            for j in d[k]:
                print(j, ":", d[k][j])

studMarks = {
    1: {"name": "alex", "gender": "m", "age": 23},
    2: {"name": "jane", "gender": "f", "age": 32},
    3: {"name": "paul", "gender": "m", "age": 18},
    4: {"name": "toni", "gender": "f", "age": 43},
}

searchStud(studMarks)
