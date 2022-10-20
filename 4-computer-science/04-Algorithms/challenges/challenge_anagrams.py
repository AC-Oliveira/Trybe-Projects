def is_anagram(first_string, second_string):
    first_string_letters_count = {
        letter.lower(): first_string.count(letter) for letter in first_string
    }
    second_string_letters_count = {
        letter.lower(): second_string.count(letter) for letter in second_string
    }
    return first_string_letters_count == second_string_letters_count
