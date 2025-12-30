from django.contrib import admin
from .models import Blog,Categories

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("Title", "Author", "Category", "PublishedDate", "IsDraft")
    search_fields = ("Title", "Content")
    list_filter = ("Category", "IsDraft", "PublishedDate")
    prepopulated_fields = {"Slug": ("Title",)}

@admin.register(Categories)
class CategoryAdmin(admin.ModelAdmin):
    list_display=('CategoryName',)