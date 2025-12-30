from django.urls import path
from .views import CreateBlog,BlogListing,CategoryListing,MyBlogListing,BlogDetailView
from .views import DraftsView,CategoryDetailView

urlpatterns=[
    path('Create/',CreateBlog),
    path('',BlogListing.as_view()),
    path('Category/',CategoryListing.as_view()),
    path('Category/<int:id>',CategoryDetailView.as_view()),
    path('Drafts/',DraftsView.as_view()),
    path('MyBlogs/',MyBlogListing.as_view()),
    path('<int:id>',BlogDetailView.as_view()),
    ]