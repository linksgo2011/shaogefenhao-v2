import yaml
from graphviz import Digraph

def create_tree(root_list, data, graph):
    print(root_list)
    print(data)
    for key in root_list:
        item = data[key]
        if 'variables' in item:
            remain_nodes = []
            for sub_key in item['variables']:
                if sub_key in data:
                    print('需要递归构建')
                    remain_nodes.append(sub_key)
                graph.edge(key,sub_key )
            create_tree(remain_nodes, data, graph)

def visualize_yaml_tree(file_path):
    with open(file_path, 'r') as file:
        yaml_data = yaml.safe_load(file)
        graph = Digraph(format='png')
        root_list = ['key1','key2']
        create_tree(root_list, yaml_data, graph)
        graph.render('yaml_tree')

# 用法示例
visualize_yaml_tree('example.yaml')
