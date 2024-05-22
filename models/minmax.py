S = {1: {'name': 'jack', 'age': 20}, 2: {'name': 'paul', 'age': 27}, 3: {'name': 'alex', 'age': 33}}

ages = [S[key]['age'] for key in S]

minimum_age = min(ages)
maximum_age = max(ages)

print("The minimum age is:", minimum_age)
print("The maximum age is:",maximum_age)