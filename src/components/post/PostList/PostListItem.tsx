import {useEffect, useMemo} from "react";
import usePost from "../../../hooks/usePost";
import {
    Box, Button,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import PostListHeader from "./PostListHeader";
import {useNavigate} from "react-router-dom";
import PostListPagination from "./PostListPagination";
import {useAppSelector} from "../../../store/config";


const PostListItem = () => {
    const { page, rowsPerPage } = useAppSelector(state => state.pagination)
    const { postList, deletePost } = usePost();
    const navigate = useNavigate();

    useEffect(() => {
    },[page, rowsPerPage, postList])

    return useMemo(() => (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <PostListHeader/>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell width="5%">ID</TableCell>
                                <TableCell width="20%" align="center">Title</TableCell>
                                <TableCell width="50%" align="center">Content</TableCell>
                                <TableCell width="10%" align="center">Created</TableCell>
                                <TableCell width="15%" align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {postList.posts.map((post) => (
                                <TableRow
                                    key={post.seq}
                                >
                                    <TableCell component="th" width="5%" scope="row">{post.seq}</TableCell>
                                    <TableCell component="th"  width="20%" scope="row" align="center">
                                        {post.title}
                                    </TableCell>
                                    <TableCell align="center" width="60%">{post.content}</TableCell>
                                    <TableCell align="center" width="60%">{post.createdDate}</TableCell>
                                    <TableCell align="center" width="15%">
                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                            <Button size="small" variant="outlined" startIcon={<Edit />} onClick={() => navigate(`/post/edit/${post.seq}`)}>
                                                Edit
                                            </Button>
                                            <Button size="small" color="error" variant="outlined" startIcon={<Delete />}  onClick={() => deletePost(post)}>
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <PostListPagination totalCount={postList.count} page={page} rowsPerPage={rowsPerPage}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    ), [postList, deletePost, navigate, page, rowsPerPage])
}

export default PostListItem;
