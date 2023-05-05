import { Chunk } from '@/api/chunk/types';
import { Tree } from '../types';

export interface TreeDetail extends Tree {
    nodes: TreeNode[];
}

export interface TreeNode extends Chunk {
    nodeId: number; // 节点Id
    deep: number; // 节点所在层级
    order: number; // 节点在层中的顺序
    nodes: TreeNode[]; // 子节点
}
