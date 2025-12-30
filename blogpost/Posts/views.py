from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Blog,Categories
from django.shortcuts import get_object_or_404

from .serializers import BlogReadSerializer,CategorySerializer,BlogCreateSerializer,BlogUpdateSerializer
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CreateBlog(request):
    serializer = BlogCreateSerializer(data=request.data)
    if serializer.is_valid():
        blog = serializer.save(Author=request.user)
        read_serializer = BlogReadSerializer(blog)
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from Profile.Pagination import CustomPagination
class BlogListing(APIView):
    def get(self,request):
        blogs=Blog.objects.filter(IsDraft=False)
        paginator=CustomPagination()
        page = paginator.paginate_queryset(blogs, request)
        if page is not None:
            serializer=BlogReadSerializer(page,many=True, context={'request': request})
            return paginator.get_paginated_response(serializer.data)
        serializer=BlogReadSerializer(blogs,many=True, context={'request': request})
        return Response(serializer.data)
    
class MyBlogListing(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        blogs=Blog.objects.filter(IsDraft=False,Author=request.user)
        serializer=BlogReadSerializer(blogs,many=True, context={'request': request})
        return Response(serializer.data)

class DraftsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        blogs=Blog.objects.filter(IsDraft=True,Author=request.user.id)
        serializer=BlogReadSerializer(blogs,many=True, context={'request': request})
        return Response(serializer.data)

from rest_framework.parsers import MultiPartParser, FormParser
class CategoryListing(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        categories = Categories.objects.all()
        serializer = CategorySerializer(categories, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        print(f"DEBUG: Request user is {request.user}") 
        
        serializer = CategorySerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(Author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class CategoryDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]
    def patch(self, request, id):
        category = get_object_or_404(Categories, id=id)

        # Only the owner can edit
        if category.Author != request.user:
            return Response({"detail": "Not allowed"}, status=status.HTTP_403_FORBIDDEN)

        serializer = CategorySerializer(
            category,
            data=request.data,       # <-- required to update
            partial=True,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class BlogDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]  

    def get(self, request, id):
        blog = get_object_or_404(Blog, id=id)
        serializer = BlogReadSerializer(blog, context={'request': request})
        return Response(serializer.data)

    def patch(self, request, id):
        blog = get_object_or_404(Blog, id=id)

        if blog.Author != request.user:
            return Response({"detail": "Not allowed"}, status=403)

        serializer = BlogUpdateSerializer(blog, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)

        print(serializer.errors)
        return Response(serializer.errors, status=400)
    def delete(self,request,id):
        blog = get_object_or_404(Blog, id=id)
        if blog.Author!=request.user:
            return Response({"detail": "Not allowed"}, status=403)
        blog.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)