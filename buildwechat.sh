folder=posts/architecture
fileName=editable-architecture-diagrams
imageHost=https://raw.githubusercontent.com/linksgo2011/shaogefenhao-v2/master/src/$folder
rm -rf build
mkdir build

cat src/${folder}/${fileName}.md > build/output.md
sed -i "" "s@./$fileName@$imageHost/$fileName@g" build/output.md
sed -i "" "s@src=$fileName\"@src=\"$imageHost/$fileName@g" build/output.md
pandoc -s build/output.md -w html --template=template/wechat_template.html -o build/wechat.html  --title-prefix email --highlight-style pygments

juice build/wechat.html build/wechat.html
