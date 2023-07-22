def topological_sort(graph):
    in_degree = {node: 0 for node in graph}
    for node in graph:
        for neighbor in graph[node]:
            in_degree[neighbor] += 1

    queue = [node for node in graph if in_degree[node] == 0]
    result = []
    levels = {node: 0 for node in graph}

    while queue:
        node = queue.pop(0)
        result.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            levels[neighbor] = max(levels[neighbor], levels[node] + 1)
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return result, levels


def generate_parallel_expression(graph):
    topological_order, levels = topological_sort(graph)

    parallel_tasks = {}
    for node in topological_order:
        level = levels[node]
        if level not in parallel_tasks:
            parallel_tasks[level] = []
        parallel_tasks[level].append(node)

    when_expr = "THEN(" + ", ".join(f"WHEN({', '.join(parallel_tasks[level])})" for level in sorted(parallel_tasks.keys())) + ")"
    return when_expr


def main():
    # 定义有向无环图
    graph = {
        "a": ["b","e"],
        "b": [ "d"],
        "c": ['e'],
        "d": ["e"],
        "e": ["f"],
        "f": []
    }

    # 生成并行执行表达式
    parallel_expression = generate_parallel_expression(graph)
    print("Parallel Execution Expression:")
    print(parallel_expression)

if __name__ == "__main__":
    main()
