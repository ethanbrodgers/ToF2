# utils.py: A few helper functions for use around the backend


def serialize_doc(doc):
    """Converts results of Mongo searches to json-serializable dictionaries.
    This involves converting ObjectIDs to strings."""
    # shallow copy
    doc = dict(doc)
    # stringify id
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs):
    return [serialize_doc(doc) for doc in docs]




