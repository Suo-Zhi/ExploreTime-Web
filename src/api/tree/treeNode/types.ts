import { Chunk } from '@/api/chunk/types';
import { Tree } from '../types';

export interface TreeDetail extends Tree {
    nodes: TreeNode[];
}

// 必须继承Chunk,不然无法拖拽
export interface TreeNode extends Chunk {
    node: {
        id: number; // 节点Id
        treeId: number; // 节点所在树Id
        parentNodeId: number | null; // 父节点Id
        order: number; // 节点在层中的顺序
        children: TreeNode[]; // 子节点
    };

    level: {
        deep: number; // 节点所在层级
        prefix: string; // 节点标题前缀
    };
}
