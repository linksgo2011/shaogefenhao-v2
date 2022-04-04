folder=_posts/architecture
fileName=offline-application
imageHost=https://github.com/shaogefenhao/wiki/raw/master/source/$folder/

rm -rf build
mkdir build

cat docs/${folder}/${fileName}.md > build/output.md
sed -i "" "s@$fileName@$imageHost/$fileName@g" build/output.md
sed -i "" "s@src=$fileName\"@src=\"$imageHost/$fileName@g" build/output.md
pandoc -s build/output.md -w html --template=template/email_template.html -o build/email.html  --title-prefix email --highlight-style pygments
