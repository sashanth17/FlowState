from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Blog,Categories

class BlogReadSerializer(ModelSerializer):
    Author=serializers.StringRelatedField()
    Category=serializers.StringRelatedField()
    CategoryID = serializers.PrimaryKeyRelatedField(source='Category', read_only=True)
    class Meta:
        model=Blog 
        fields=["id","Title","Content","Slug","Author","Category",'CategoryID',"FeatureImage","PublishedDate","UpdatedAt"]
    def get_FeatureImage(self, obj):
        request = self.context.get('request')
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)
        return None
class BlogUpdateSerializer(serializers.ModelSerializer):
    # Keep as StringRelatedField so the response shows the name, 
    # but it's read_only so the user can't "fudge" the author.
    Author = serializers.StringRelatedField(read_only=True)
    
    # PrimaryKeyRelatedField is perfect for the ID '2'.
    # We add required=False so it doesn't complain if a partial update skips it.
    Category = serializers.PrimaryKeyRelatedField(
        queryset=Categories.objects.all(),
        required=False
    )

    class Meta:
        model = Blog
        fields = ["Title", "Content", "Category", "FeatureImage", "IsDraft", "Author"]
        # With partial=True in the view, these are redundant but safe.
        extra_kwargs = {
            "Title": {"required": False},
            "Content": {"required": False},
            "FeatureImage": {"required": False},
            "IsDraft": {"required": False},
        }
class BlogCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            "Title",
            "Content",
            "Slug",
            "Category",
            "FeatureImage",
            "IsDraft",
        ]


class CategorySerializer(ModelSerializer):
    Author = serializers.StringRelatedField(read_only=True)
    class Meta:
        model=Categories
        fields=['id','CategoryName','CategoryImage','CategoryDescription','Author']
    def get_CategoryImage(self, obj):
        request = self.context.get('request')
        if obj.CategoryImage:
            return request.build_absolute_uri(obj.CategoryImage.url)
        return None
class BlogDisplay(ModelSerializer):
    pass