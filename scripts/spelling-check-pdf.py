import fitz  # PyMuPDF
from spellchecker import SpellChecker
import re

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page_number in range(doc.page_count):
        page = doc[page_number]
        text += page.get_text()

    return text

def extract_valid_english_words(text):
    # 使用正则表达式匹配合法的英文单词，保留大小写
    words = re.findall(r'\b[a-zA-Z]+\b', text)
    return words

def filter_spelling_errors(words, spell_checker):
    misspelled_words = []

    for word in words:
        print(word)
        if spell_checker.correction(word) != word:
            misspelled_words.append(word)

    return misspelled_words

def write_to_file(words, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        for word in words:
            file.write(word + '\n')

def main():
    pdf_path = "final.pdf"  # 替换为实际的PDF文件路径
    output_file_all = "output_all_words.txt"  # 替换为实际的输出文件路径（包含所有单词）
    output_file_errors = "output_spelling_errors.txt"  # 替换为实际的输出文件路径（拼写错误的单词）

    pdf_text = extract_text_from_pdf(pdf_path)
    valid_english_words = extract_valid_english_words(pdf_text)

    print("所有合法的英文单词已写入文件:", output_file_all)
    write_to_file(valid_english_words, output_file_all)

    # 创建拼写检查器
    spell = SpellChecker()

    # 过滤出拼写错误的单词
    misspelled_words = filter_spelling_errors(valid_english_words, spell)

    print("拼写错误的英文单词已写入文件:", output_file_errors)
    write_to_file(misspelled_words, output_file_errors)

if __name__ == "__main__":
    main()
