def sum_even_numbers(numbers):
    """
    Calculate the sum of all even numbers in a list.
    
    Parameters:
        numbers (list): A list of numbers.
        
    Returns:
        int: The sum of all even numbers in the list.
    """
    even_sum = 0
    for num in numbers:
        if num % 2 == 0:
            even_sum += num
    return even_sum

my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = sum_even_numbers(my_list)
print("Sum of even numbers:", result)  # Output will be 30 (2 + 4 + 6 + 8 + 10)
